type UserProfile = {
  displayName: string;
  avatar?: string;
};

type User = {
  profile?: UserProfile;
  id: string;
  isAnonymous: boolean;
};

export default User;
