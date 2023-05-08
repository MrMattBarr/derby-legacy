import AppText from "components/Controls/Text";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import useProjectBuilder from "./Context";
import Nothing from "components/Nothing";

const Steps = observer(() => {
  const colors = useColors();
  const { steps } = useProjectBuilder();
  const currentStep = steps.findIndex((x) => !x.complete);
  const completeSteps = steps.slice(0, currentStep);

  const CurrentCompoent = steps[currentStep].component ?? Nothing;

  return (
    <View>
      {completeSteps.map((step, index) => {
        return (
          <AppText
            key={step.label}
            strikeThrough
            style={{
              color: colors.Text.complete,
            }}
            kalam
          >
            {`${index + 1}. ${step.label}`}
          </AppText>
        );
      })}
      <AppText kalam>{`${currentStep + 1}. ${
        steps[currentStep].label
      }`}</AppText>
      <CurrentCompoent />
    </View>
  );
});

export default Steps;
