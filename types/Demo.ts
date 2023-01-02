export enum Visibility {
  PRIVATE = "Private",
  PUBLIC = "Public",
  DRAFT = "Draft",
}

type Demo = {
  title: string;
  summary?: string;
  spots?: string[];
  id: string;
  userId: string;
  visibility: Visibility;
  created: number;
};

export default Demo;
