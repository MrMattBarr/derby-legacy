export enum NavPage {
  WELCOME = "welcome",
  PROFILE = "profile",
  DEMOS = "demos",
  PROJECTS = "projects",
  ROLE = "role",
}

export type NavConfig = {
  label: string;
  icon?: string;
  name: any;
};

export const NavConfigs: Record<NavPage, NavConfig> = {
  [NavPage.WELCOME]: {
    label: "Welcome",
    name: "Welcome",
  },
  [NavPage.PROFILE]: {
    label: "Profile",
    name: "Profile",
    icon: "v-card",
  },
  [NavPage.DEMOS]: {
    label: "Demos",
    name: "Demos",
    icon: "archive",
  },
  [NavPage.PROJECTS]: {
    label: "Projects",
    name: "Projects",
    icon: "documents",
  },
  [NavPage.ROLE]: {
    label: "Role",
    name: "Role",
  },
};
