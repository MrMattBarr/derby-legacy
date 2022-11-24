import { observer } from "mobx-react";
import React from "react";
import { useAuth } from "../../stores/AuthStore";
import { useModal } from "../../stores/ModalStore";
import TextButton from "../TextButton";

const SignInButton = observer(() => {
  const authStore = useAuth();
  const modalStore = useModal();
  const openLogin = () => {
    modalStore.setModal("LOGIN");
  };
  const { user } = authStore;
  const showName = user?.displayName ?? user?.email ?? "Unknown";
  const loggedIn = user && !user.isAnonymous;
  console.log({ user, showName, loggedIn });
  return (
    <>
      {!loggedIn && <TextButton onPress={openLogin} label="Sign In" />}
      {loggedIn && <TextButton onPress={() => {}} label={showName} />}
    </>
  );
});

export default SignInButton;
