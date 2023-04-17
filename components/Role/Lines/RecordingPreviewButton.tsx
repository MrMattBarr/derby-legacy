import IconButton from "components/IconButton";
import useRecordingBooth from "components/modals/Recording/context";
import useLine from "contexts/LineContext";
import { useColors } from "hooks/useColorScheme";
import React, { useState } from "react";
import { View } from "react-native";
import { Sizes } from "styles/sizes";
import { generateStyles } from "./styles";
import { observer } from "mobx-react";

const RecordingPreviewButtons = observer(() => {
  const { reset, recording, metadata } = useRecordingBooth();
  const [submitting, setSubmitting] = useState(false);
  const colors = useColors();
  const { addTake } = useLine();
  const { buttonHolder } = generateStyles(colors);

  const canSubmit = recording && metadata;

  const submit = () => {
    const success = () => {
      setSubmitting(false);
    };
    if (canSubmit && !submitting) {
      setSubmitting(true);
      addTake({ recording, metadata, callbacks: { success } });
    }
  };

  return (
    <View style={buttonHolder}>
      <IconButton
        onPress={reset}
        icon="cross"
        style={{
          marginRight: Sizes.Spacings.STANDARD,
          backgroundColor: colors.Backgrounds.empty,
        }}
      />
      <IconButton
        onPress={submit}
        loading={submitting}
        icon="paper-plane"
        background={colors.Backgrounds.default}
      />
    </View>
  );
});

export default RecordingPreviewButtons;
