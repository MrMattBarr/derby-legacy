import AppText from "components/Controls/Text";
import React from "react";
import { useColors } from "../../hooks/useColorScheme";
import { View } from "../Themed";
import { generateStyles } from "./styles";

const ProjectSummary = () => {
  const colors = useColors();
  const { projectCard } = generateStyles(colors);
  return (
    <View style={projectCard}>
      <View>
        <AppText header>Dracula goes to the movies</AppText>
      </View>
    </View>
  );
};

export default ProjectSummary;
