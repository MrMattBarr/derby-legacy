import { Theme } from "constants/Colors";
import { StyleSheet } from "react-native";
import { Sizes } from "styles/sizes";

interface IStyles {
  finalized?: boolean;
}
export const generateStyles = (colors: Theme, props?: IStyles) => {
  const { finalized } = props ?? {};
  return StyleSheet.create({
    roleLine: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 2,
      padding: Sizes.Spacings.STANDARD,
      backgroundColor: finalized
        ? colors.Backgrounds.complete
        : colors.Backgrounds.empty,
    },
    rolesContainer: {
      backgroundColor: colors.Borders.default,
      padding: 2,
      flexGrow: 1,
      paddingBottom: 0,
    },
    expanderColumn: {
      width: Sizes.Fonts.ICONS,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    rolesContainerHolder: {
      display: "flex",
      flexDirection: "row",
    },
    uncastAvatar: {
      width: 60,
      height: 60,
      borderColor: colors.Borders.default,
      borderWidth: 2,
      borderRadius: 55,
      marginRight: Sizes.Spacings.STANDARD,
      borderStyle: "dashed",
    },
  });
};
