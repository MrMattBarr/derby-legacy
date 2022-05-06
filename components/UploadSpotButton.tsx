import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import useApi from "../contexts/ApiContext";
import useSpots from "../contexts/SpotsContext";
import useColorScheme from "../hooks/useColorScheme";
import { spotFromFile } from "../types/Spot";

export default function UploadSpotButton() {
  const colorScheme = useColorScheme();
  const { uploadFile } = useApi();
  const { spotIds, spots } = useSpots();
  const buttonColor = Colors[colorScheme].text;
  const beginUpload = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
    const onComplete = (url: string, id: string) => {
      const newSpot = spotFromFile(file, { id, url });
      if (newSpot) {
        spots[newSpot.id] = newSpot;
        spotIds.push(newSpot.id);
      } else {
        throw new Error("Unable to process spot. Spot undefined.");
      }
    };
    uploadFile({ file, onComplete });
  };
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: buttonColor,
      borderRadius: 100,
      marginRight: 20,
      padding: 10,
      backgroundColor: Colors[colorScheme].contrastBand,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable onPress={beginUpload}>
        <AntDesign name="upload" size={30} color={buttonColor} />
      </Pressable>
    </View>
  );
}
