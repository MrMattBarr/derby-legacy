import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
} from "firebase/auth";
import {
  ref as dbRef,
  getDatabase,
  onValue,
  push,
  remove,
  set,
  update,
} from "firebase/database";
import {
  StorageError,
  UploadTaskSnapshot,
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toJS } from "mobx";
import { DB, DBSpecs } from "types/apiHelpers";
import Demo from "./types/Demo";
import Spot from "./types/Spot";
import User from "./types/User";
import { recordingToBlob } from "./utils";
import { Take } from "types/Take";

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
  onError?: (id: string) => any;
  db: DB;
}

const fetchThing = <Type extends ThingWithId>({
  id,
  onFetch,
  db,
  onError,
}: FetchArgs<Type>) => {
  const database = getDatabase();
  const { dbKey } = DBSpecs[db];
  const thingRef = dbRef(database, `${dbKey}/${id}`);
  onValue(thingRef, async (snapshot) => {
    const thing: Type = snapshot.val();
    if (!thing) {
      if (onError) {
        onError(id);
        return;
      }
    }
    try {
      thing.id = id;
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
  fetchThing<User>({ id, onFetch, db: DB.USER });
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
  fetchThing<Spot>({ id, onFetch, db: DB.SPOT });
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

const createSpot = async (spot: Partial<Spot>, recording: Recording) => {
  const newSpot = await createThing({ thing: spot, db: DB.SPOT });
  registerSpotToUser(spot.author!, newSpot.id);
  uploadSpot({ spot: newSpot, recording });
  return newSpot;
  //   if (!spot.author) {
  //     throw new Error("Can't createa spot without an author");
  //   }
  //   const db = getDatabase();
  //   const uploadPromise = new Promise<Spot>((resolve, reject) => {
  //     push(dbRef(db, "spots"), spot)
  //       .then(({ key }) => {
  //         if (!key) {
  //           throw new Error("No key was returned for spot creation");
  //         }
  //         const uploadedSpot: Partial<Spot> = { ...spot };
  //         uploadedSpot.id = key;
  //         registerSpotToUser(uploadedSpot.author!, key);
  //         uploadSpot({ spot: uploadedSpot as Spot, recording });
  //         resolve(uploadedSpot as Spot);
  //       })
  //       .catch((reason) => {
  //         reject(reason);
  //       });
  //   });
  //   const newSpot = await uploadPromise;
  //   return newSpot;
};

const createTake = ({ take, recording }: any) => {};
const deleteTake = (id: string) => {};
const fetchTake = (args: Partial<FetchArgs<Take>>) => {};

export interface ThingWithId {
  id: string;
}
interface ElementLookup<Thing extends ThingWithId> {
  thing: Partial<Thing>;
  db: DB;
}

interface IdLookup {
  id: string;
  db: DB;
}

const createThing = async <Thing extends ThingWithId>({
  thing,
  db,
}: ElementLookup<Thing>) => {
  const spec = DBSpecs[db];
  const anything = { ...thing } as any;
  spec.requiredFields.forEach((field) => {
    if (!anything[field]) {
      throw new Error(
        `Unable to save ${db} due to missing field "${field}": ${JSON.stringify(
          thing
        )}`
      );
    }
  });
  spec.unsaveableFields.forEach((field) => delete anything[field]);

  const database = getDatabase();
  const uploadPromise = new Promise<Thing>((resolve, reject) => {
    push(dbRef(database, spec.dbKey), anything)
      .then(({ key }) => {
        if (!key) {
          throw new Error(`No key was returned for ${db} creation`);
        }
        const uploadedThing: Partial<Thing> = { ...anything };
        uploadedThing.id = key;
        resolve(uploadedThing as Thing);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
  const newThing = await uploadPromise;
  return newThing;
};

const deleteThing = ({ id, db }: IdLookup) => {
  const { dbKey } = DBSpecs[db];
  const database = getDatabase();
  const demoRef = dbRef(database, `${dbKey}/${id}`);
  remove(demoRef);
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
  createTake,
  deleteTake,
  fetchTake,
  fetchThing,
  createThing,
  deleteThing,
};
