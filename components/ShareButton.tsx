import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Share,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useColors } from "../hooks/useColorScheme";
import IconButton from "./IconButton";

interface IShareButton {
  message: string;
}

const ShareButton = ({ message }: IShareButton) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return <IconButton inverted size={40} onPress={onShare} icon="share" />;
};

export default ShareButton;
