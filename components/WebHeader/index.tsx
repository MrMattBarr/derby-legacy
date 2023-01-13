import { Link } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import useClient from "../../contexts/ClientContext";
import { useColors } from "../../hooks/useColorScheme";
import Nothing from "../Nothing";
import { View } from "../Themed";
import SignInButton from "./SignInButton";
import { generateStyles } from "./styles";

const WebHeader = () => {
  const colors = useColors();
  const styles = generateStyles(colors);
  const { isMobile } = useClient();

  if (isMobile) {
    return <Nothing />;
  }

  return (
    <View style={styles.webHeader}>
      <Link to="/home" style={styles.headerHomeLink}>
        Derby Demos
      </Link>
      <Link to="/account" style={styles.headerLink}>
        Account
      </Link>
      <Link to="/demos" style={styles.headerLink}>
        Demos
      </Link>
      <View style={styles.spacer} />
      <SignInButton />
    </View>
  );
};

export default WebHeader;
