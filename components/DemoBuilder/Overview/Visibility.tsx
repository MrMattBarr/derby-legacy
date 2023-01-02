import { observer } from "mobx-react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useDemo from "../../../contexts/DemoContext";
import { useColors } from "../../../hooks/useColorScheme";
import textStyles from "../../../styles/text";
import { generateStyles as builderStyles } from "../styles";
import { generateStyles } from "./styles";

import { Visibility as V } from "../../../types/Demo";

const descriptions = {
  [V.DRAFT]: "No-one else can see this demo until you publish it",
  [V.PRIVATE]: "This demo is visible to anyone who has the link",
  [V.PUBLIC]: "This demo is visible on your profile",
};

const Visibility = observer(() => {
  const demoContext = useDemo();
  const { demo, setVisibility } = demoContext;
  const { h2 } = textStyles(useColors());
  if (!demo) {
    throw new Error(
      "Unable to provide an overview for a demo that does not exist"
    );
  }
  const { visibility } = demo;
  const { control } = builderStyles(useColors());
  const {
    visibility: visibilityStyle,
    visibilityEntry: entry,
    visibilityEntryText: veText,
    visibilityHolder,
    selectedVisibility,
    selectedVisibilityText,
    text,
  } = generateStyles(useColors());

  const selected = { ...entry, ...selectedVisibility };
  const selectedText = { ...veText, ...selectedVisibilityText };

  console.log({ selectedText });
  return (
    <View style={visibilityHolder}>
      <Text style={h2}>Visibility ({demo.visibility})</Text>
      <View style={{ ...control, ...visibilityStyle }}>
        <TouchableOpacity
          style={visibility === V.DRAFT ? selected : entry}
          onPress={() => setVisibility(V.DRAFT)}
        >
          <Text style={visibility === V.DRAFT ? selectedText : veText}>
            {V.DRAFT}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={visibility === V.PRIVATE ? selected : entry}
          onPress={() => setVisibility(V.PRIVATE)}
        >
          <Text style={visibility === V.PRIVATE ? selectedText : veText}>
            {V.PRIVATE}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={visibility === V.PUBLIC ? selected : entry}
          onPress={() => setVisibility(V.PUBLIC)}
        >
          <Text style={visibility === V.PUBLIC ? selectedText : veText}>
            {V.PUBLIC}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={text}>{descriptions[demo.visibility]}</Text>
    </View>
  );
});

export default Visibility;
