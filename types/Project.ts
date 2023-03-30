export type SaveableProject = {
  title: string;
  owner: string;
  roles: string[];
  description: string;
};

export interface Spot extends SaveableProject {
  id: string;
}
