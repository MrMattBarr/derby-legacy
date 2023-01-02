import React, { useEffect, useRef, useState } from "react";
import { Platform, Text, TextInput } from "react-native";
import { useColors } from "../../hooks/useColorScheme";
import { useAuth } from "../../stores/AuthStore";
import { useModal } from "../../stores/ModalStore";
import mainStyles from "../../styles/main";
import { View } from "../Themed";

const Login = () => {
  const authStore = useAuth();
  const modalStore = useModal();
  const colors = useColors();
  const styles = mainStyles(colors);
  const emailRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authenticate = async () => {
    const user = await authStore.authenticateWithEmail({ email, password });
    if (user) {
      modalStore.setModal();
    }
  };

  useEffect(() => {
    if (emailRef) {
      emailRef.current?.focus();
    }
  }, [emailRef]);
  return (
    <View style={styles.container}>
      <TextInput
        ref={emailRef}
        style={styles.input}
        placeholder="email"
        onChangeText={setEmail}
        onSubmitEditing={authenticate}
      />
      <TextInput
        style={styles.input}
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
