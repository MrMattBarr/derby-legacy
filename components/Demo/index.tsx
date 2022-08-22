import { useLinkTo } from "@react-navigation/native";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import useDemos from "../../contexts/DemosContext";
import useColorScheme from "../../hooks/useColorScheme";
import { mainStyles } from "../../listStyles";
import DemoDetailSpot from "../DemoDetailSpot";
import DemoLoadingView from "../DemoLoadingView";
import PhoneBottomSpacer from "../PhoneBottomSpacer";
import PhoneTopSpacer from "../PhoneTopSpacer";
import { View } from "../Themed";
import WebView from "./web";

export interface IDemoDetail {
  route: {
    params: {
      id: string;
    };
  };
}
const NativeView = observer(
  ({
    route: {
      params: { id },
    },
  }: IDemoDetail) => {
    console.log("hello");
    const { demos, deleteDemo, loadDemo } = useDemos();
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

    useEffect(() => {
      if (!demo) {
        loadDemo(id);
      }
    }, [demo]);
    if (!demo) {
      return <DemoLoadingView />;
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

const PlatformPage = Platform.select({
  native: () => NativeView,
  default: () => WebView,
})();

export default PlatformPage;
