import { AppColor } from "constants/Colors";

export type SaveableRole = {
  project: string;
  talent?: string;
  name: string;
  offer?: string;
  description: string;
  lines: string[];
  color?: AppColor;
  dueDate?: number;
};

export interface Role extends SaveableRole {
  id: string;
}
