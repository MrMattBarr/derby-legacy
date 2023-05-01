import AppText from "components/Controls/Text";
import { UserProvider } from "contexts/UserContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { generateStyles } from "./styles";
import Header from "./Header";
import useTextBar from "contexts/TextBarContext";
import SketchLine from "components/Svg/SketchLine";
import useProjectBuilder, { ProjectBuilderProvider } from "./Context";
import Steps from "./Steps";

const WrappedProjectBuilder = observer(() => {
  const authStore = useAuth();
  const colors = useColors();
  const { page, body } = generateStyles(colors);
  const { name, setName } = useProjectBuilder();
  const { setTextBarArgs } = useTextBar();
  const id = authStore.user?.uid;

  if (!id) {
    return <></>;
  }
  useEffect(() => {
    setTextBarArgs({ onSubmit: setName });
  }, []);
  const hasName = name.trim().length > 0;
  return (
    <UserProvider id={id}>
      <View style={page}>
        <Header />
        <SketchLine />
        <View style={body}>
          <Steps />
        </View>
      </View>
    </UserProvider>
  );
});

const ProjectBuilder = () => {
  return (
    <ProjectBuilderProvider>
      <WrappedProjectBuilder />
    </ProjectBuilderProvider>
  );
};

export default ProjectBuilder;
