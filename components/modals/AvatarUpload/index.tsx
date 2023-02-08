import { observer } from "mobx-react";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import useUser, { UserProvider } from "../../../contexts/UserContext";
import { useColors } from "../../../hooks/useColorScheme";
import { useAuth } from "../../../stores/AuthStore";
import * as ImagePicker from "expo-image-picker";
import Preview from "./Preview";
import { generateStyles } from "./styles";
import SaveButton from "./SaveButton";
const AvatarUpload = observer(() => {
  const authStore = useAuth();
  const id = authStore.user?.uid;
  const [image, setImage] = useState<string | undefined>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const colors = useColors();
  const { avatarBox, holder } = generateStyles(colors);
  return (
    <UserProvider id={id}>
      <View style={holder}>
        <Pressable style={avatarBox} onPress={pickImage}>
          <Preview src={image} />
        </Pressable>
        <SaveButton src={image} />
      </View>
    </UserProvider>
  );
});
export default AvatarUpload;
