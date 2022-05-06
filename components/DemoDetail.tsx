import { useLinkTo } from "@react-navigation/native";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useDemos from "../contexts/DemosContext";
import useColorScheme from "../hooks/useColorScheme";
import { mainStyles } from "../listStyles";
import DemoDetailSpot from "./DemoDetailSpot";
import PhoneBottomSpacer from "./PhoneBottomSpacer";
import PhoneTopSpacer from "./PhoneTopSpacer";
import PlayButton from "./PlayButton";
import { View } from "./Themed";

interface IDemoDetail {
  route: {
    params: {
      id: string;
    };
  };
}
const DemoDetail = observer(
  ({
    route: {
      params: { id },
    },
  }: IDemoDetail) => {
    const { demos, deleteDemo } = useDemos();
    const linkTo = useLinkTo();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];
    const jsDemos = toJS(demos);
    const demo = jsDemos[id];
    const deleteThisDemo = () => {
      linkTo("/demos");
      deleteDemo(id);
    };
    const styles = mainStyles(colors);
    const customStyles = StyleSheet.create({
      spotsHolder: {
        flexGrow: 1,
        padding: 20,
        width: "100%",
      },
      spots: {
        borderWidth: 2,
        borderColor: colors.hardBorder,
        borderRadius: 5,
        maxHeight: 200,
      },
    });
    if (!demo) {
      return <View />;
    }
    return (
      <View style={{ flexGrow: 1 }}>
        <PhoneTopSpacer>
          <View style={styles.header}>
            <Text style={styles.headerText}>{demo?.title}</Text>
          </View>
        </PhoneTopSpacer>
        <View style={styles.flexView}>
          <View style={customStyles.spotsHolder}>
            <View style={customStyles.spots}>
              {demo.spots.map((id, index) => {
                return <DemoDetailSpot key={id} id={id} first={index === 0} />;
              })}
            </View>
          </View>
          <TouchableOpacity onPress={deleteThisDemo}>
            <Text style={styles.deleteText}>delete demo</Text>
          </TouchableOpacity>
        </View>
        <PhoneBottomSpacer />
      </View>
    );
  }
);

export default DemoDetail;
