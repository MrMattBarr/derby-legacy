type UserProfile = {
  displayName: string;
  avatar?: string;
};

type User = {
  profile?: UserProfile;
  id: string;
  demos: string[];
  spots: string[];
  isAnonymous: boolean;
};

export default User;
