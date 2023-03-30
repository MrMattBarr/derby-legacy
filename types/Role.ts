export type SaveableRole = {
  project: string;
  name: string;
  contract: string;
  description: string;
  lines: string[];
};

export interface Role extends SaveableRole {
  id: string;
}
