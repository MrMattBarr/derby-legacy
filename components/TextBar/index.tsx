import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Pressable, TextInput, View } from "react-native";
import useTextBar from "../../contexts/TextBarContext";
import { useColors } from "../../hooks/useColorScheme";
import { Sizes } from "../../styles/sizes";
import { generateStyles } from "./styles";

const TextBar = () => {
  const colors = useColors();
  const { submitTextBar, args } = useTextBar();
  const [draft, setDraft] = useState(args?.text ?? "");
  const { input, bar, sendButton } = generateStyles(colors);
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current!.focus();
      }, 100);
    }
  }, [inputRef.current]);
  if (!args) {
    return <></>;
  }
  const submit = () => {
    if (submitTextBar) {
      submitTextBar(draft);
    }
  };
  return (
    <KeyboardAvoidingView behavior={"padding"}>
      <View style={bar}>
        <TextInput
          selectTextOnFocus
          ref={inputRef}
          style={input}
          onChangeText={setDraft}
          defaultValue={args.text}
        />
        <Pressable onPress={submit} style={sendButton}>
          <Entypo
            name="arrow-up"
            size={Sizes.Fonts.HEADER}
            color={colors.Text.default}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextBar;
