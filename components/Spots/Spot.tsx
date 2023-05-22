import AppText from "components/Controls/Text";
import IconButton from "components/IconButton";
import Nothing from "components/Nothing";
import { ModalKey } from "config/ModalKeys";
import { useModal } from "contexts/ModalContext";
import usePlayback from "contexts/PlaybackContext";
import useSpot from "contexts/SpotContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Sizes } from "styles/sizes";
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
      <View>
        <AppText style={styles.spotTitle}>{spot?.title}</AppText>
      </View>
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
