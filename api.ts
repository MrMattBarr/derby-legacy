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

interface IFetchAudio {
  id: string;
  db: DB;
}

export interface Completable {
  success?: () => void;
  error?: (message: string) => void;
}

const loadAudio = async ({ id, db }: IFetchAudio) => {
  const storage = getStorage();
  const spec = DBSpecs[db];
  const storageRef = ref(storage, `${spec.dbKey}/${id}`);
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

interface IUploadRecording {
  id: string;
  recording: Recording;
  db: DB;
  onUpdate?: (snapshot: UploadTaskSnapshot) => void;
  onComplete?: (downloadURL: string) => void;
  onError?: (error: string | StorageError) => void;
}

const uploadRecording = async ({
  id,
  db,
  recording,
  onUpdate,
  onError,
  onComplete,
}: IUploadRecording) => {
  const storage = getStorage();
  const { dbKey } = DBSpecs[db];
  const uploadName = `/${dbKey}/${id}`;
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
        const uploadName = `${dbKey}/${id}/url`;
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
  const { dbKey, recordingField, firebaseNullables } = DBSpecs[db];
  const thingRef = dbRef(database, `${dbKey}/${id}`);
  onValue(thingRef, async (snapshot) => {
    const thing: Type = snapshot.val();
    if (!thing) {
      console.log(`Unable to load: ${dbKey}/${id}`);
      if (onError) {
        onError(id);
        return;
      }
    }
    try {
      const anything = thing as any;
      anything.id = id;
      if (anything.url && recordingField) {
        anything[recordingField] = await loadAudio({ id, db });
      }
      (firebaseNullables ?? []).forEach((field) => {
        if (!anything[field]) {
          anything[field] = {};
        }
      });
      onFetch(anything);
    } catch (err) {
      console.log({ err });
    }
  });
};

interface UpdateArgs<Type> extends Completable {
  thing: Partial<Type>;
  db: DB;
}

const updateThing = <Type extends ThingWithId>({
  thing,
  db,
  ...onComplete
}: UpdateArgs<Type>) => {
  const database = getDatabase();
  const { dbKey, unsaveableFields, crossReferences } = DBSpecs[db];
  const location = `${dbKey}/${thing.id}`;
  const copy = { ...thing } as any;
  unsaveableFields.map((field) => {
    if (Object.keys(copy).includes(field)) {
      delete copy[field];
    }
  });
  update(dbRef(database, location), copy).then(() => {
    (crossReferences ?? []).forEach((crossReference) => {
      if (copy[crossReference.localKey]) {
        const crUpdate = {
          id: copy[crossReference.localKey],
          [crossReference.foreignKey]: {
            [thing.id as string]: true,
          },
        };
        updateThing({
          db: crossReference.db,
          thing: crUpdate,
        });
      }
    });
    if (onComplete.success) {
      onComplete.success();
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
export interface ThingWithId {
  id: string;
}
interface ElementLookup<Thing extends ThingWithId> {
  thing: Partial<Thing>;
  db: DB;
  recording?: Recording;
}

interface IdLookup {
  id: string;
  db: DB;
}

const createThing = async <Thing extends ThingWithId>({
  thing,
  db,
  recording,
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
        const onComplete = () => {
          resolve(uploadedThing as Thing);
        };
        if (spec.recordingField && recording) {
          uploadRecording({
            id: key,
            db,
            recording,
            onComplete,
          });
        } else {
          onComplete();
        }
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
      console.log({ error });
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
  createDemo,
  subscribeToUserSpots,
  removeSpotFromUser,
  fetchUser,
  fetchDemo,
  subscribeToUserDemos,
  deleteDemo,
  registerUser,
  updateUser,
  updateDemo,
  createAccount,
  signIn,
  signOut,
  fetchThing,
  createThing,
  deleteThing,
  updateThing,
  uploadRecording,
};
