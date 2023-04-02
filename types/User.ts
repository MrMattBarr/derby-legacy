type UserProfile = {
  displayName: string;
  avatar?: string;
};

type User = {
  profile?: UserProfile;
  id: string;
  demos: string[];
  spots: string[];
  roles: string[];
  isAnonymous: boolean;
};

export default User;
