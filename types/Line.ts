export type SaveableRole = {
  project: string;
  contract: string;
  description: string;
  lines: string[];
};

export interface Role extends SaveableRole {
  id: string;
}
