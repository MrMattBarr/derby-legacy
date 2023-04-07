export enum DB {
  SPOT = "spot",
  DEMO = "demo",
  LINE = "line",
  TAKE = "take",
  USER = "user",
  PROJECT = "project",
  ROLE = "role",
}

type DBSpec = {
  requiredFields: string[];
  unsaveableFields: string[];
  firebaseNullables?: string[];
  recordingField?: string;
  dbKey: string;
};

export const DBSpecs: Record<DB, DBSpec> = {
  [DB.SPOT]: {
    requiredFields: ["url", "created", "author", "audio"],
    unsaveableFields: ["id", "audio"],
    recordingField: "audio",
    dbKey: "spots",
  },
  [DB.USER]: {
    requiredFields: ["profile", "demos", "spots"],
    firebaseNullables: ["profile", "demos", "spots"],
    unsaveableFields: ["id"],
    dbKey: "users",
  },
  [DB.PROJECT]: {
    requiredFields: ["owner", "roles"],
    unsaveableFields: ["id"],
    dbKey: "projects",
  },
  [DB.ROLE]: {
    requiredFields: ["talent", "project", "lines", "dueDate"],
    unsaveableFields: ["id"],
    dbKey: "roles",
  },
  [DB.DEMO]: {
    requiredFields: [],
    unsaveableFields: [],
    dbKey: "demos",
  },
  [DB.LINE]: {
    requiredFields: ["role", "takes", "text"],
    unsaveableFields: [],
    dbKey: "lines",
  },
  [DB.TAKE]: {
    requiredFields: ["line"],
    unsaveableFields: ["id", "audio"],
    dbKey: "takes",
    recordingField: "audio",
  },
};
