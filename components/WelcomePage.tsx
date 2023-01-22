import { Link } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Platform } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import OpenBoothButton from "./modals/Recording/OpenBoothButton";
import Page from "./Page";

const LoginPage = observer(() => {
  const colors = useColors();
  const styles = mainStyles(colors);
  return (
    <Page>
      <OpenBoothButton />
    </Page>
  );
});

const PickyWelcomePage = Platform.select({
  native: () => LoginPage,
  default: () => LoginPage,
})();

export default PickyWelcomePage;
