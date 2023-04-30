import Loading from "components/Demo/Loading";

import AppText from "components/Controls/Text";
import ExpanderColumn from "components/Role/Lines/ExpanderColumn";
import useProject, { ProjectProvider } from "contexts/ProjectContext";
import { useColors } from "hooks/useColorScheme";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useProjects } from "stores/ProjectsStore";
import { generateStyles } from "../Role/Lines/styles";
import ProjectRoles from "./ProjectRoles";
import BigButton from "components/Buttons/BigButton";
import useAppNav from "contexts/NavigationContext";
import { NavPage } from "constants/Navigation";

const InnerLine = () => {
  const { element } = useProject();
  const { go } = useAppNav();
  if (!element) {
    return <Loading />;
  }

  const [expanded, setExpanded] = useState(false);
  const colors = useColors();
  const {
    titleText,
    smallText,
    content,
    scriptButton,
    textHolder,
    listItem,
    header,
    expandedContent,
  } = generateStyles(colors);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const viewScript = () => {
    go(NavPage.SCRIPTS, { id: element.id });
  };

  const roleWord = element.roles.length === 1 ? "role" : "roles";

  return (
    <Pressable style={listItem} onPress={toggleExpand}>
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
          <View style={expandedContent}>
            <BigButton
              style={scriptButton}
              onPress={viewScript}
              label="Script"
              icon="text-document"
            />
            <View style={textHolder}>
              <AppText>This is where the project summary might go.</AppText>
            </View>
            <ProjectRoles />
          </View>
        )}
      </View>
    </Pressable>
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
