import { NavPage } from "constants/Navigation";
import useAppNav from "contexts/NavigationContext";
import { observer } from "mobx-react";
import React from "react";
import { useColors } from "../../../hooks/useColorScheme";
import { useAuth } from "../../../stores/AuthStore";
import TextButton from "../../Buttons/TextButton";
import { View } from "../../Themed";
import { generateStyles } from "./styles";

const AccountsControls = observer(() => {
  const colors = useColors();
  const { reset } = useAppNav();
  const logOut = () => {
    authStore.logout();

    reset(NavPage.WELCOME);
  };
  const { holder, header, headerHolder } = generateStyles(colors);
  const authStore = useAuth();
  return (
    <View style={holder}>
      <View style={headerHolder}></View>
      <TextButton label="Log Out" onPress={logOut} danger />
    </View>
  );
});

export default AccountsControls;
