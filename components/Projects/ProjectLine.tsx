import Loading from "components/Demo/Loading";
import PlaybackView from "components/modals/Recording/PlaybackView";
import { LoadableSound } from "types/AudioMetadata";

import useTake, { TakeProvider } from "contexts/TakeContext";
import React, { useState } from "react";
import useProject, { ProjectProvider } from "contexts/ProjectContext";
import { useProjects } from "stores/ProjectsStore";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { useColors } from "hooks/useColorScheme";
import useAppNav from "contexts/NavigationContext";
import { generateStyles } from "./styles";
import ExpanderColumn from "components/Role/Lines/ExpanderColumn";

const InnerLine = () => {
  const { element } = useProject();
  if (!element) {
    return <Loading />;
  }

  const [expanded, setExpanded] = useState(false);
  const colors = useColors();
  const { listItem, titleText, projectLine, smallText, content, daysLeft } =
    generateStyles(colors);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const roleWord = element.roles.length === 1 ? "role" : "roles";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={projectLine}
      onPress={toggleExpand}
    >
      <ExpanderColumn expanded={expanded} />
      <View style={content}>
        <View>
          <Text style={titleText}>{element.title}</Text>
          <Text style={smallText}>{`${element.roles.length} ${roleWord}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProjectLine = ({ id }: { id: string }) => {
  const store = useProjects();
  if (!id) {
    return <Loading />;
  }

  return (
    <ProjectProvider id={id} store={store}>
      <InnerLine />
    </ProjectProvider>
  );
};

export default ProjectLine;
