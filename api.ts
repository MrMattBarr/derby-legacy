import { Audio } from "expo-av";
import { DocumentResult } from "expo-document-picker";
import {
  getDatabase,
  onValue,
  ref as dbRef,
  remove,
  set,
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
  user: string;
  file: DocumentResult;
  onUpdate?: (snapshot: UploadTaskSnapshot) => void;
  onComplete?: (downloadURL: string, id: string) => void;
  onError?: (error: string | StorageError) => void;
};

const uploadFile = async ({
  file,
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
          tags: [],
          length: 123,
          url,
        };
        set(dbRef(db, uploadName), spot);
      });
    }
  );
};
const subscribeToUserSpots = (user: string, callback: (spots: any) => void) => {
  const db = getDatabase();
  const spotsRef = dbRef(db, "spots/");
  onValue(spotsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

const subscribeToUserDemos = (user: string, callback: (demos: any) => void) => {
  const db = getDatabase();
  const demosRef = dbRef(db, "demos/");
  onValue(demosRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

const deleteDemo = async (id: string) => {
  const db = getDatabase();
  const demoRef = dbRef(db, `demos/${id}`);
  remove(demoRef);
};

const uploadDemo = async (demo: Demo) => {
  const db = getDatabase();
  const uploadName = `demos/${demo.id}`;
  set(dbRef(db, uploadName), demo);
};
export {
  loadSpotAudio,
  uploadFile,
  uploadDemo,
  subscribeToUserSpots,
  subscribeToUserDemos,
  deleteDemo,
};
export type { UploadFileArgs };
