export type SaveableLine = {
  project: string;
  contract: string;
  description: string;
  lines: string[];
};

export interface Line extends SaveableLine {
  id: string;
}
