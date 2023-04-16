import { ApprovalStatus } from "./Take";

export type Line = {
  id: string;
  role: string;
  delivery: string;
  context: string;
  text: string;
  status: ApprovalStatus;
  name: string;
  takes: string[];
};
