export type SaveableLine = {
  id: string;
  delivery: string;
  context: string;
  text: string;
};

export interface Line extends SaveableLine {
  id: string;
}
