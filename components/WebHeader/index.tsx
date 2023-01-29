import { Link } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import useClient from "../../contexts/ClientContext";
import { useColors } from "../../hooks/useColorScheme";
import { useAuth } from "../../stores/AuthStore";
import Nothing from "../Nothing";
import { View } from "../Themed";
import SignInButton from "./SignInButton";
import { generateStyles } from "./styles";

const WebHeader = observer(() => {
  const colors = useColors();
  const styles = generateStyles(colors);
  const authStore = useAuth();
  const { isMobile } = useClient();
  console.log(authStore.user?.uid);
  const profileLink = `/profile/${authStore.user?.uid}`;

  if (isMobile) {
    return <Nothing />;
  }

  return (
    <View style={styles.webHeader}>
      <Link to="/home" style={styles.headerHomeLink}>
        Derby Demos
      </Link>
      <Link to={profileLink} style={styles.headerLink}>
        Profile
      </Link>
      <Link to="/demos" style={styles.headerLink}>
        Demos
      </Link>
      <Link to="/spots" style={styles.headerLink}>
        Spots
      </Link>
      <View style={styles.spacer} />
      <SignInButton />
    </View>
  );
});

export default WebHeader;
