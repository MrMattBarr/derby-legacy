import { Entypo } from "@expo/vector-icons";
import { useLinkTo } from "@react-navigation/native";
import { NavConfigs, NavPage } from "constants/Navigation";
import useClient from "contexts/ClientContext";
import useAppNav from "contexts/NavigationContext";
import useTextBar from "contexts/TextBarContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { generateStyles } from "./styles";

interface INavButton {
  destination: NavPage;
  args: any;
  notifications?: number;
}

const NavButton = observer(
  ({ destination, args, notifications }: INavButton) => {
    const { icon, label } = NavConfigs[destination];
    const textBar = useTextBar();
    const colors = useColors();
    const { go, currentPage } = useAppNav();
    const isCurrentPage = currentPage === destination;
    const styles = generateStyles(colors, {
      hasTextBar: !!textBar?.args,
      isCurrentPage,
    });
    return (
      <Pressable
        style={styles.iconHolder}
        onPress={() => {
          go(destination, args);
        }}
      >
        <View style={styles.centerStack}>
          {notifications && (
            <View style={styles.alert}>
              <Text style={styles.alertText}>{notifications}</Text>
            </View>
          )}
          <Entypo name={icon as any} color={styles.text.color} size={35} />
          <Text style={styles.text}>{label}</Text>
        </View>
      </Pressable>
    );
  }
);

export default NavButton;
