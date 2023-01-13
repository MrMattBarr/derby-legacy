import { observer } from "mobx-react";
import React from "react";
import { useAuth } from "../../stores/AuthStore";
import { useModal } from "../../contexts/ModalContext";
import { useUsers } from "../../stores/UsersStore";
import TextButton from "../Buttons/TextButton";

const SignInButton = observer(() => {
  const authStore = useAuth();
  const modalStore = useModal();
  const UsersStore = useUsers();
  const users = UsersStore.users;
  const openLogin = () => {
    modalStore.setModal("LOGIN");
  };
  const user = users[authStore?.user?.uid ?? -1];
  const showName = user?.profile?.displayName ?? "Unknown";
  const loggedIn = user && !user.isAnonymous;

  return (
    <>
      {!loggedIn && <TextButton onPress={openLogin} label="Sign In" />}
      {loggedIn && <TextButton onPress={() => {}} label={showName} />}
    </>
  );
});

export default SignInButton;
