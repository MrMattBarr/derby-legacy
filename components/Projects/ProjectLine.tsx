import Loading from "components/Demo/Loading";

import ExpanderColumn from "components/Role/Lines/ExpanderColumn";
import useProject, { ProjectProvider } from "contexts/ProjectContext";
import { useColors } from "hooks/useColorScheme";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useProjects } from "stores/ProjectsStore";
import { generateStyles } from "../Role/Lines/styles";
import AppText from "components/Controls/Text";
import ProjectRoles from "./ProjectRoles";

const InnerLine = () => {
  const { element } = useProject();
  if (!element) {
    return <Loading />;
  }

  const [expanded, setExpanded] = useState(false);
  const colors = useColors();
  const {
    titleText,
    smallText,
    content,
    textHolder,
    listItem,
    header,
    expanderColumn,
  } = generateStyles(colors);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const roleWord = element.roles.length === 1 ? "role" : "roles";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={listItem}
      onPress={toggleExpand}
    >
      <View style={content}>
        <View style={header}>
          <ExpanderColumn expanded={expanded} />
          <View>
            <Text style={titleText}>{element.title}</Text>
            <Text
              style={smallText}
            >{`${element.roles.length} ${roleWord}`}</Text>
          </View>
        </View>
        {expanded && (
          <View style={expanderColumn}>
            <View style={textHolder}>
              <AppText>This is where the project summary might go.</AppText>
            </View>
            <ProjectRoles />
          </View>
        )}
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
