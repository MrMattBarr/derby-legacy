import { useLinkTo } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { IDemoPage } from "../components/Demo";
import { useColors } from "../hooks/useColorScheme";
import { useAuth } from "../stores/AuthStore";
import { useDemos } from "../stores/DemosStore";
import { generatePageStyles } from "../styles/page";
import textStyles from "../styles/text";
import Demo, { Visibility } from "../types/Demo";

const DemoGenerationPage = observer(({ route }: IDemoPage) => {
  const id = route?.params?.id;
  const [demoId, setDemoId] = useState("");
  const linkTo = useLinkTo();
  const colors = useColors();
  const demoStore = useDemos();
  const authStore = useAuth();
  const uid = authStore.user?.uid;
  const demo = demoStore.demos[demoId];
  const { page, pageContent } = generatePageStyles(colors);
  const { text } = textStyles(colors);

  const createDemo = async () => {
    if (!uid || authStore.user?.isAnonymous) {
      return;
    }
    const newDemo: Partial<Demo> = {
      title: "",
      userId: uid,
      visibility: Visibility.DRAFT,
      spots: [],
      created: Date.now(),
    };
    const uploadedDemo = await demoStore.createDemo(newDemo);
    linkTo(`/demos/${uploadedDemo.id}`);
  };

  useEffect(() => {
    createDemo();
  }, [demoId, uid, authStore.user]);

  return (
    <View style={page}>
      <View style={pageContent}>
        <Text style={text}>Generating Demo...</Text>
      </View>
    </View>
  );
});

export default DemoGenerationPage;
