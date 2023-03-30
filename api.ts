import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import { DocumentResult } from "expo-document-picker";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
} from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref as dbRef,
  remove,
  set,
  update,
} from "firebase/database";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  StorageError,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { toJS } from "mobx";
import Demo from "./types/Demo";
import Spot, { SaveableSpot } from "./types/Spot";
import User from "./types/User";
import { randomId, recordingToBlob } from "./utils";

//TODO: separate quick and full
const loadSpotAudio = async (spotId: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `spots/${spotId}`);
  const uri = await getDownloadURL(ref(storage, storageRef.fullPath));
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync({ uri });
  } catch (error) {
    console.log("error:", error);
  }
  return soundObject;
};

type UploadFileArgs = {
  file: DocumentResult;
  author: string;
  onUpdate?: (snapshot: UploadTaskSnapshot) => void;
  onComplete?: (downloadURL: string, id: string) => void;
  onError?: (error: string | StorageError) => void;
};

type UploadSpotArgs = {
  spot: Spot;
  recording: Recording;
  onUpdate?: (snapshot: UploadTaskSnapshot) => void;
  onComplete?: (downloadURL: string) => void;
  onError?: (error: string | StorageError) => void;
};

const registerUser = (user: User) => {
  const db = getDatabase();
  const uploadName = `users/${user.id}`;
  set(dbRef(db, uploadName), {
    demos: {},
    spots: {},
    profile: user.profile,
  });
};

const registerDemoToUser = (userId: string, demoId: string) => {
  const db = getDatabase();
  const reference = `users/${userId}/demos/${demoId}`;
  set(dbRef(db, reference), true);
};

const registerSpotToUser = (userId: string, spotId: string) => {
  const db = getDatabase();
  const reference = `users/${userId}/spots/${spotId}`;
  set(dbRef(db, reference), true);
};

const uploadFile = async ({
  file,
  author,
  onUpdate,
  onComplete,
  onError,
}: UploadFileArgs) => {
  const storage = getStorage();
  if (!(file.type === "success")) {
    return;
  }
  if (file.size! > 5000000) {
    if (onError) {
      onError("nah thats too big");
    }
  }
  const id = randomId();
  const uploadName = `/spots/${id}`;
  const storageRef = ref(storage, uploadName);
  const fetchResponse = await fetch(file!.uri);
  const blob = await fetchResponse.blob();
  const uploadTask = uploadBytesResumable(storageRef, blob);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      if (onUpdate) {
        onUpdate(snapshot);
      }
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        const db = getDatabase();
        const uploadName = `spots/${id}`;
        const spot: Partial<Spot> = {
          title: "peekaboo",
          author,
          tags: [],
          length: 123,
          url,
        };
        set(dbRef(db, uploadName), spot);
        registerSpotToUser(author, spot.id!);
      });
    }
  );
};

const uploadSpot = async ({
  spot,
  recording,
  onUpdate,
  onError,
  onComplete,
}: UploadSpotArgs) => {
  const storage = getStorage();
  const uploadName = `/spots/${spot.id}`;
  const storageRef = ref(storage, uploadName);
  const blob = await recordingToBlob(recording);
  const uploadTask = uploadBytesResumable(storageRef, blob);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      if (onUpdate) {
        onUpdate(snapshot);
      }
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        const db = getDatabase();
        const uploadName = `spots/${spot.id}/url`;
        set(dbRef(db, uploadName), url);
        if (onComplete) {
          onComplete(url);
        }
      });
    }
  );
};

const subscribeToUserSpots = (user: string, callback: (spots: any) => void) => {
  const db = getDatabase();
  const spotsRef = dbRef(db, `users/${user}/spots`);
  onValue(spotsRef, (snapshot) => {
    const data = snapshot.val();
    const spotIds = Object.keys(data ?? {});
    callback(spotIds);
  });
};

interface FetchArgs<Type> {
  id: string;
  onFetch: (things: Type) => any;
  onError?: (id?: string) => any;
  dbKey: string;
}

const fetchThing = <Type>({ id, onFetch, dbKey, onError }: FetchArgs<Type>) => {
  const db = getDatabase();
  const thingRef = dbRef(db, `${dbKey}/${id}`);
  onValue(thingRef, async (snapshot) => {
    const thing: Type = snapshot.val();
    if (!thing) {
      if (onError) {
        onError(id);
        return;
      }
    }
    try {
      onFetch(thing);
    } catch (err) {
      console.log({ err });
    }
  });
};

const fetchUser = (id: string, callback: (user: User) => void) => {
  const onFetch = async (user: User) => {
    if (user) {
      user.id = id;
      callback(user);
    } else {
      console.warn(`unable to load user: ${id}`);
    }
  };
  fetchThing({ id, onFetch, dbKey: "users" });
};

const fetchSpot = (
  id: string,
  callback: (spots: Spot) => void,
  onError?: (id: string) => void
) => {
  const onFetch = async (spot: Spot) => {
    spot.id = id;
    spot.audio = await loadSpotAudio(id);
    callback(spot);
  };
  fetchThing({ id, onFetch, dbKey: "spots", onError });
};

const fetchDemo = (id: string, callback: (demo: Demo) => void) => {
  if (!id) {
    throw new Error("Unable to fetch demo with no ID");
  }
  const db = getDatabase();
  const spotsRef = dbRef(db, `demos/${id}`);
  onValue(spotsRef, (snapshot) => {
    const demo: Demo = snapshot.val();
    demo.id = id;
    callback(demo);
  });
};

const subscribeToUserDemos = (user: string, callback: (demos: any) => void) => {
  const db = getDatabase();
  const spotsRef = dbRef(db, `users/${user}/demos`);
  onValue(spotsRef, (snapshot) => {
    const data = snapshot.val();
    const demoIds = Object.keys(data ?? {});
    callback(demoIds);
  });
};

const deleteSpot = async (spot: Spot) => {
  if ((spot.demos?.length ?? 0) > 0) {
    throw new Error("unable to delete spot thats in demos");
  }
  const storage = getStorage();
  const refLocation = `/spots/${spot.id}`;
  const deleteRef = ref(storage, refLocation);
  console.log({ deleteRef, refLocation });
  await deleteObject(deleteRef);
  const db = getDatabase();
  const spotRef = dbRef(db, `spots/${spot.id}`);
  remove(spotRef);
};

const deleteDemo = (id: string) => {
  const db = getDatabase();
  const demoRef = dbRef(db, `demos/${id}`);
  remove(demoRef);
};

const createDemo = async (demo: Partial<Demo>) => {
  if (!!demo.id) {
    throw new Error(
      "Upload Demo isn't meant for demos that already have an ID"
    );
  }
  if (!demo.userId) {
    throw new Error("Can't createa demo without a userId");
  }
  const db = getDatabase();
  const uploadPromise = new Promise<Demo>((resolve, reject) => {
    push(dbRef(db, "demos"), demo)
      .then(({ key }) => {
        if (!key) {
          throw new Error("No key was returned for demo creation");
        }
        demo.id = key;
        registerDemoToUser(demo.userId!, key);
        resolve(demo as Demo);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
  const newDemo = await uploadPromise;
  return newDemo;
};

const createSpot = async (spot: SaveableSpot, recording: Recording) => {
  if (!spot.author) {
    throw new Error("Can't createa spot without an author");
  }
  const db = getDatabase();
  const uploadPromise = new Promise<Spot>((resolve, reject) => {
    push(dbRef(db, "spots"), spot)
      .then(({ key }) => {
        if (!key) {
          throw new Error("No key was returned for spot creation");
        }
        const uploadedSpot: Partial<Spot> = { ...spot };
        uploadedSpot.id = key;

        registerSpotToUser(uploadedSpot.author!, key);
        uploadSpot({ spot: uploadedSpot as Spot, recording });
        resolve(uploadedSpot as Spot);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
  const newSpot = await uploadPromise;
  return newSpot;
};

interface IRemveSpot {
  userId: string;
  spotId: string;
}
const removeSpotFromUser = ({ userId, spotId }: IRemveSpot) => {
  const db = getDatabase();
  const removeRef = `users/${userId}/spots/${spotId}`;
  remove(dbRef(db, removeRef));
};

const updateSpot = (spot: Partial<Spot>) => {
  const db = getDatabase();
  const spotLocation = `spots/${spot.id}`;
  const copy = { ...spot };
  delete copy.id;
  delete copy.audio;
  update(dbRef(db, spotLocation), copy);
};

const updateDemo = (demo: Partial<Demo>) => {
  const copy = { ...toJS(demo) };
  delete copy.id;
  const db = getDatabase();
  const demoLocation = `demos/${demo.id}`;
  update(dbRef(db, demoLocation), copy);
};

const updateUser = (user: Partial<User>) => {
  const copy = { ...toJS(user) };
  delete copy.id;
  const db = getDatabase();
  const demoLocation = `users/${user.id}`;
  update(dbRef(db, demoLocation), copy);
};

export interface FirebaseUserCredentials {
  email: string;
  password: string;
}
const createAccount = ({ email, password }: FirebaseUserCredentials) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

const signIn = async ({ email, password }: FirebaseUserCredentials) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }
};

const signOut = async () => {
  const auth = getAuth();
  try {
    return await signOutFromFirebase(auth);
  } catch (error: any) {
    console.error(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }
};

export {
  loadSpotAudio,
  uploadFile,
  createDemo,
  createSpot,
  subscribeToUserSpots,
  deleteSpot,
  removeSpotFromUser,
  fetchSpot,
  fetchUser,
  fetchDemo,
  subscribeToUserDemos,
  deleteDemo,
  registerUser,
  updateUser,
  updateSpot,
  updateDemo,
  createAccount,
  signIn,
  signOut,
};
export type { UploadFileArgs };
