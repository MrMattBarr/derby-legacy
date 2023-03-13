import { observer } from "mobx-react";
import React from "react";
import { useColors } from "../../../hooks/useColorScheme";
import { useAuth } from "../../../stores/AuthStore";
import TextButton from "../../Buttons/TextButton";
import { Text, View } from "../../Themed";
import { generateStyles } from "./styles";

const AccountsControls = observer(() => {
  const colors = useColors();
  const { holder, header, headerHolder } = generateStyles(colors);
  const authStore = useAuth();
  return (
    <View style={holder}>
      <View style={headerHolder}></View>
      <TextButton label="Log Out" onPress={authStore.logout} danger />
    </View>
  );
});

export default AccountsControls;
