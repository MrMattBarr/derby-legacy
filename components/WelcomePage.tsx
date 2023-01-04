import { Link } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Platform } from "react-native";
import { useColors } from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import Page from "./Page";

const LoginPage = observer(() => {
  const colors = useColors();
  const styles = mainStyles(colors);
  return (
    <Page>
      <Link to="/demos" style={styles.headerLink}>
        Demos
      </Link>
    </Page>
  );
});

const PickyWelcomePage = Platform.select({
  native: () => LoginPage,
  default: () => LoginPage,
})();

export default PickyWelcomePage;
