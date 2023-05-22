import { Entypo } from "@expo/vector-icons";
import BigButton from "components/Buttons/BigButton";
import AppText from "components/Controls/Text";
import Spinner from "components/Spinner";
import * as Clipboard from "expo-clipboard";
import { useColors } from "hooks/useColorScheme";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";
import { useModal } from "contexts/ModalContext";
import useProjectBuilder from "./Context";
import { ModalKey } from "config/ModalKeys";

const ScriptReceiver = () => {
  const colors = useColors();
  const { setModal } = useModal();

  const [copiedText, setCopiedText] = useState("");
  const [checkInterval, setCheckInterval] = useState<
    NodeJS.Timer | undefined
  >();

  const { name } = useProjectBuilder();
  const startParsing = (lines: string[]) => {
    setModal(ModalKey.SCRIPT_PARSER, {
      scriptParserArgs: { lines, title: name },
    });
  };

  const hasClipboardText = copiedText.trim().length > 0;
  const {
    scriptReceiverBox,
    clipboardPreview,
    iconHolder,
    scriptPreview,
    spinnerHolder,
  } = generateStyles(colors, { hasClipboardText });
  const INTERVAL_LENGTH = 500;

  const checkClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setCopiedText(text);
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    const interval = setInterval(checkClipboard, INTERVAL_LENGTH);
    setCheckInterval(interval);
  }, []);

  const lines = copiedText.split("\n\n");

  const newLineCount = lines.length;
  const lineWord = newLineCount === 1 ? "line" : "lines";

  return (
    <View style={scriptReceiverBox}>
      {!hasClipboardText && (
        <AppText style={{ marginBottom: Sizes.Spacings.STANDARD }}>
          Derby is watching your clipboard for a script.
        </AppText>
      )}

      <View style={clipboardPreview}>
        <View style={iconHolder}>
          <Entypo
            name="clipboard"
            size={Sizes.Fonts.ICONS}
            style={{ marginRight: Sizes.Spacings.SMALL }}
            color={hasClipboardText ? colors.Text.complete : colors.Text.subtle}
          />
          <View style={spinnerHolder}>
            <Spinner
              spinning={!hasClipboardText}
              size={30}
              color={
                hasClipboardText
                  ? colors.Backgrounds.secondary
                  : colors.Text.placeholder
              }
            />
          </View>
        </View>
        <View style={scriptPreview}>
          <AppText
            wrap
            style={{
              flexShrink: 1,
              flexGrow: 1,
              color: !hasClipboardText
                ? colors.Text.subtle
                : colors.Text.default,
              flexWrap: "wrap",
            }}
            header={!hasClipboardText}
            lineBreakMode="tail"
            ellipsizeMode="tail"
            numberOfLines={hasClipboardText ? 3 : 1}
          >
            {copiedText || "..."}
          </AppText>
        </View>
      </View>

      {hasClipboardText && (
        <View>
          <Text>
            <AppText style={{ fontWeight: "bold" }}>Length: </AppText>
            <AppText>{`~${newLineCount} ${lineWord}`}</AppText>
          </Text>
        </View>
      )}
      <BigButton
        disabled={!hasClipboardText}
        onPress={() => startParsing(lines)}
        label="Parse"
        style={{ marginTop: Sizes.Spacings.STANDARD }}
      />
    </View>
  );
};

export default ScriptReceiver;
