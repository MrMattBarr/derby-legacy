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
  dbKey: string;
};

export const DBSpecs: Record<DB, DBSpec> = {
  [DB.SPOT]: {
    requiredFields: ["url", "created", "author", "audio"],
    unsaveableFields: ["id", "audio"],
    dbKey: "spots",
  },
  [DB.USER]: {
    requiredFields: ["profile", "demos", "spots"],
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
    requiredFields: [],
    unsaveableFields: [],
    dbKey: "line",
  },
  [DB.TAKE]: {
    requiredFields: [],
    unsaveableFields: [],
    dbKey: "takes",
  },
};
