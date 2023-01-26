import { observer } from "mobx-react";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ModalKey, useModal } from "../../contexts/ModalContext";
import usePlayback from "../../contexts/PlaybackContext";
import useSpot from "../../contexts/SpotContext";
import { useColors } from "../../hooks/useColorScheme";
import { Sizes } from "../../styles/sizes";
import IconButton from "../IconButton";
import Nothing from "../Nothing";
import { Text, View } from "../Themed";
import { generateStyles } from "./styles";

const Spot = observer(() => {
  const colors = useColors();
  const playbackStore = usePlayback();
  const { spot, isOwner } = useSpot();
  const { setModal } = useModal();
  const styles = generateStyles(colors);

  if (!spot) {
    return <Nothing />;
  }
  const load = () => {
    playbackStore.load(spot);
  };

  const editSpot = () => {
    setModal(ModalKey.SPOT_EDITOR, { spotId: spot.id });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.spot} onPress={load}>
      <Text style={styles.spotTitle}>{spot?.title}</Text>
      {isOwner && (
        <View>
          <IconButton
            label="SHARE"
            onPress={editSpot}
            icon="edit"
            size={Sizes.Fonts.ICONS}
          />
        </View>
      )}
    </TouchableOpacity>
  );
});
export default Spot;
