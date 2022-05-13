import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import useApi from "../contexts/ApiContext";
import useSpots from "../contexts/SpotsContext";
import useUser from "../contexts/UserContext";
import useColorScheme, { useColors } from "../hooks/useColorScheme";
import { spotFromFile } from "../types/Spot";

const UploadSpotButton = observer(() => {
  const colors = useColors();
  const { uploadFile } = useApi();
  const { spotIds, spots } = useSpots();
  const { user } = useUser();
  const buttonColor = colors.buttonFG;
  const beginUpload = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
    const onComplete = (url: string, id: string) => {
      const newSpot = spotFromFile(file, { id, url });
      if (newSpot) {
        spots[newSpot.id] = newSpot;
        runInAction(() => {
          spotIds.push(newSpot.id);
        });
      } else {
        throw new Error("Unable to process spot. Spot undefined.");
      }
    };
    uploadFile({ author: toJS(user)?.id, file, onComplete });
  };
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: buttonColor,
      borderRadius: 100,
      padding: 10,
      backgroundColor: colors.buttonBG,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable onPress={beginUpload}>
        <AntDesign name="upload" size={30} color={buttonColor} />
      </Pressable>
    </View>
  );
});
export default UploadSpotButton;
