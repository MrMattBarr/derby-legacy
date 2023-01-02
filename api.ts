import { Audio } from "expo-av";
import { DocumentResult } from "expo-document-picker";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  onValue,
  ref as dbRef,
  remove,
  set,
  update,
  push,
} from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref,
  StorageError,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { toJS } from "mobx";
import Demo from "./types/Demo";
import Spot from "./types/Spot";
import User from "./types/User";
import { randomId } from "./utils";

//TODO: separate quick and full
const loadSpotAudio = async (spotId: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `spots/${spotId}`);
  const uri = await getDownloadURL(ref(storage, storageRef.fullPath));
  const { sound } = await Audio.Sound.createAsync({ uri });
  return sound;
};

type UploadFileArgs = {
  file: DocumentResult;
  author: string;
  onUpdate?: (snapshot: UploadTaskSnapshot) => void;
  onComplete?: (downloadURL: string, id: string) => void;
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
  console.log(`New user registered: ${user.id}`);
};

const registerDemoToUser = (userId: string, demoId: string) => {
  const db = getDatabase();
  const reference = `users/${userId}/demos/${demoId}`;
  set(dbRef(db, reference), true);
};

const registerSpot = (spot: Partial<Spot>) => {
  const db = getDatabase();
  const reference = `users/${spot.author}/spots/${spot.id}`;
  console.log({ reference });
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
  console.log({ author });
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
        registerSpot({ ...spot, id });
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
  dbKey: string;
}

const fetchThing = <Type>({ id, onFetch, dbKey }: FetchArgs<Type>) => {
  const db = getDatabase();
  const thingRef = dbRef(db, `${dbKey}/${id}`);
  onValue(thingRef, async (snapshot) => {
    const thing: Type = snapshot.val();
    onFetch(thing);
  });
};

const fetchUser = (id: string, callback: (user: User) => void) => {
  const onFetch = async (user: User) => {
    user.id = id;
    callback(user);
  };
  fetchThing({ id, onFetch, dbKey: "users" });
};

const fetchSpot = (id: string, callback: (spots: Spot) => void) => {
  const onFetch = async (spot: Spot) => {
    spot.id = id;
    spot.audio = await loadSpotAudio(id);
    callback(spot);
  };
  fetchThing({ id, onFetch, dbKey: "spots" });
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
    console.log({ demo });
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

const updateSpot = (spot: Partial<Spot>) => {
  const db = getDatabase();
  const spotLocation = `spots/${spot.id}`;
  update(dbRef(db, spotLocation), spot);
};

const updateDemo = (demo: Partial<Demo>) => {
  const copy = { ...toJS(demo) };
  console.log(copy);
  delete copy.id;
  const db = getDatabase();
  const demoLocation = `demos/${demo.id}`;
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

export {
  loadSpotAudio,
  uploadFile,
  createDemo,
  subscribeToUserSpots,
  fetchSpot,
  fetchUser,
  fetchDemo,
  subscribeToUserDemos,
  deleteDemo,
  registerUser,
  updateSpot,
  updateDemo,
  createAccount,
  signIn,
};
export type { UploadFileArgs };
