import ScrollTest from "components/ScrollTest";
import SketchLine from "components/Svg/SketchLine";
import useTextBar from "contexts/TextBarContext";
import { UserProvider } from "contexts/UserContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "stores/AuthStore";
import useProjectBuilder, { ProjectBuilderProvider } from "./Context";
import Header from "./Header";
import Steps from "./Steps";
import { generateStyles } from "./styles";

const WrappedProjectBuilder = observer(() => {
  const authStore = useAuth();
  const colors = useColors();
  const { page, body, content } = generateStyles(colors);
  const { name, setName } = useProjectBuilder();
  const { setTextBarArgs, clearTextBar } = useTextBar();
  const id = authStore.user?.uid;

  if (!id) {
    return <></>;
  }
  useEffect(() => {
    if (!name) {
      setTextBarArgs({ onSubmit: setName });
    } else {
      clearTextBar();
    }
  }, [name]);
  return (
    <UserProvider id={id}>
      <View style={page}>
        <View style={content}>
          <Header />
          <SketchLine />
          <View style={body}>
            <Steps />
          </View>
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
