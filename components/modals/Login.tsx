import React, { useEffect, useRef, useState } from "react";
import { Platform, TextInput } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { useAuth } from "../../stores/AuthStore";
import { ModalKey, useModal } from "../../contexts/ModalContext";
import { View } from "../Themed";
import { modalStyles } from "./styles";

const Login = () => {
  const authStore = useAuth();
  const modalStore = useModal();
  const colors = useColors();
  const { modal } = modalStyles(colors);
  const emailRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authenticate = async () => {
    const user = await authStore.authenticateWithEmail({ email, password });
    if (user) {
      modalStore.setModal(ModalKey.NONE);
    }
  };

  useEffect(() => {
    if (emailRef) {
      emailRef.current?.focus();
    }
  }, [emailRef]);
  return (
    <View style={modal}>
      <TextInput
        ref={emailRef}
        placeholder="email"
        onChangeText={setEmail}
        onSubmitEditing={authenticate}
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        onChangeText={setPassword}
        onSubmitEditing={authenticate}
      />
    </View>
  );
};

const PickyLogin = Platform.select({
  native: () => Login,
  default: () => Login,
})();

export default PickyLogin;
