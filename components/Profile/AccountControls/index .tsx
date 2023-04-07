import TextButton from "components/Buttons/TextButton";
import { NavPage } from "constants/Navigation";
import useAppNav from "contexts/NavigationContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { generateStyles } from "./styles";

const AccountsControls = observer(() => {
  const colors = useColors();
  const { reset } = useAppNav();
  const logOut = () => {
    authStore.logout();

    reset(NavPage.WELCOME);
  };
  const { holder, headerHolder } = generateStyles(colors);
  const authStore = useAuth();
  return (
    <View style={holder}>
      <View style={headerHolder}></View>
      <TextButton label="Log Out" onPress={logOut} danger />
    </View>
  );
});

export default AccountsControls;
