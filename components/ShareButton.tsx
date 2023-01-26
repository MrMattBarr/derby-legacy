import React from "react";
import { Share } from "react-native";
import IconButton from "./IconButton";

interface IShareButton {
  message: string;
}

const ShareButton = ({ message }: IShareButton) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Derby Demos",
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

  return <IconButton label="SHARE" onPress={onShare} icon="share" />;
};

export default ShareButton;
