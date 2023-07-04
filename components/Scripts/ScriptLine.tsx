import AppText from "components/Controls/Text";
import useLine, { LineProvider } from "contexts/LineContext";
import { useColors } from "hooks/useColorScheme";
import React, { useEffect } from "react";
import { generateStyles } from "./styles";
import { View } from "react-native";
import Loading from "components/Loading";
import { useRoles } from "stores/RolesStore";
import { AppColor } from "constants/Colors";
import Takes from "./Takes";

const WrappedScriptLine = () => {
  const { line } = useLine();
  const rolesStore = useRoles();
  const colors = useColors();

  useEffect(() => {
    if (line?.role) {
      rolesStore.load(line.role);
    }
  }, [line?.role]);
  const role = line?.role ? rolesStore.things[line.role] : undefined;
  //   const character = characters.find((x) => x.name === line.character);
  if (!line) {
    return <Loading />;
  }

  //   const characterColor = character?.color;
  const { scriptLine, lineCharacter, lineTextHolder } = generateStyles(colors, {
    characterColor: role?.color as AppColor,
  });
  if (line.takes) {
    console.log(line.takes);
  }

  return (
    <View style={scriptLine}>
      {line.role && (
        <View style={lineCharacter}>
          <AppText header>{role?.name}</AppText>
        </View>
      )}
      <Takes />
      <View style={lineTextHolder}>
        <AppText>{line.text}</AppText>
      </View>
    </View>
  );
};

const ScriptLine = ({ id }: { id: string }) => {
  return (
    <LineProvider id={id}>
      <WrappedScriptLine />
    </LineProvider>
  );
};
export default ScriptLine;
