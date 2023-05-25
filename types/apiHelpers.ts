export enum DB {
  SPOT = "spot",
  DEMO = "demo",
  LINE = "line",
  TAKE = "take",
  USER = "user",
  PROJECT = "project",
  ROLE = "role",
  OFFER = "offer",
}

type CrossRefrence = {
  db: DB;
  localKey: string;
  foreignKey: string;
};

type DBSpec = {
  requiredFields: string[];
  unsaveableFields: string[];
  firebaseNullables?: string[];
  recordingField?: string;
  crossReferences?: CrossRefrence[];
  dbKey: string;
};

export const DBSpecs: Record<DB, DBSpec> = {
  [DB.SPOT]: {
    requiredFields: ["url", "created", "author", "audio"],
    unsaveableFields: ["id", "audio"],
    firebaseNullables: ["metadata"],
    recordingField: "audio",
    dbKey: "spots",
  },
  [DB.USER]: {
    requiredFields: ["profile", "demos", "spots", "projects"],
    firebaseNullables: ["profile", "demos", "spots", "projects"],
    unsaveableFields: ["id"],
    dbKey: "users",
  },
  [DB.PROJECT]: {
    requiredFields: ["owner", "roles"],
    unsaveableFields: ["id"],
    crossReferences: [
      {
        db: DB.USER,
        localKey: "owner",
        foreignKey: "projects",
      },
    ],
    dbKey: "projects",
  },
  [DB.ROLE]: {
    requiredFields: ["project", "lines"],
    unsaveableFields: ["id"],
    crossReferences: [
      {
        db: DB.USER,
        localKey: "talent",
        foreignKey: "roles",
      },
      {
        db: DB.PROJECT,
        localKey: "project",
        foreignKey: "roles",
      },
    ],
    dbKey: "roles",
  },
  [DB.DEMO]: {
    requiredFields: ["user"],
    unsaveableFields: [],
    firebaseNullables: ["spots"],
    dbKey: "demos",
  },
  [DB.LINE]: {
    requiredFields: ["takes", "text"],
    unsaveableFields: [],
    crossReferences: [],
    dbKey: "lines",
  },
  [DB.TAKE]: {
    requiredFields: ["line"],
    unsaveableFields: ["id", "audio"],
    dbKey: "takes",
    recordingField: "audio",
  },
  [DB.OFFER]: {
    requiredFields: ["created", "role", "owner"],
    unsaveableFields: ["id", "audio"],
    dbKey: "offers",
    recordingField: "audio",
  },
};
