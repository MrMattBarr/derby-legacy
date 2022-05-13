import { Audio } from "expo-av";
import { DocumentResult } from "expo-document-picker";
import {
  getDatabase,
  onValue,
  ref as dbRef,
  remove,
  set,
  update,
} from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  StorageError,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
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
    display: user.display,
    avatar: "",
  });
  console.log(`New user registered: ${user.id}`);
};

const registerSpot = (spot: Partial<Spot>) => {
  const db = getDatabase();
  const reference = `users/${spot.author}/spots/${spot.id}`;
  console.log({ reference });
  set(dbRef(db, reference), true);
};
const registerDemo = (demo: Partial<Demo>) => {
  const db = getDatabase();
  const reference = `users/${demo.userId}/demos/${demo.id}`;
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
const fetchSpot = (id: string, callback: (spots: any) => void) => {
  const db = getDatabase();
  const spotsRef = dbRef(db, `spots/${id}`);
  onValue(spotsRef, async (snapshot) => {
    const spot: Spot = snapshot.val();
    spot.id = id;
    spot.audio = await loadSpotAudio(id);
    callback(spot);
  });
};
const fetchDemo = (id: string, callback: (demo: Demo) => void) => {
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

const uploadDemo = (demo: Demo) => {
  const db = getDatabase();
  const uploadName = `demos/${demo.id}`;
  set(dbRef(db, uploadName), demo);
  registerDemo(demo);
};

const updateSpot = (spot: Partial<Spot>) => {
  const db = getDatabase();
  const spotLocation = `spots/${spot.id}`;
  update(dbRef(db, spotLocation), spot);
};
export {
  loadSpotAudio,
  uploadFile,
  uploadDemo,
  subscribeToUserSpots,
  fetchSpot,
  fetchDemo,
  subscribeToUserDemos,
  deleteDemo,
  registerUser,
  updateSpot,
  registerDemo,
};
export type { UploadFileArgs };
