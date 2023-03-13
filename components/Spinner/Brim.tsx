import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { AppColor } from "../../constants/Colors";

interface IGear {
  size: number;
  background: AppColor;
  foreground: AppColor;
}
const Brim = ({ size, foreground }: IGear) => {
  return (
    <Svg
      viewBox="0 0 958 67"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
    >
      <Path
        d="M441.881 1188.12c9.608 17.17.083 53.96-50.033 44.44C382.356 1222.54 259 1091.7 259 1091.7s157.034 81.51 182.881 96.42z"
        transform="translate(-117.738 -1364.92) rotate(-46.58 583.036 1425.677)"
        fill={foreground}
      />
      <Path
        d="M441.881 1188.12c9.608 17.17.083 53.96-50.033 44.44C382.356 1222.54 259 1091.7 259 1091.7s157.034 81.51 182.881 96.42z"
        transform="translate(-117.738 -1364.92) rotate(-46.58 583.036 1425.677) rotate(-161.01 646.154 1384.346)"
        fill={foreground}
      />
    </Svg>
  );
};

Brim.defaultProps = {
  size: 200,
  background: AppColor.CHARCOAL,
  foreground: AppColor.OLIVE,
};

export default Brim;
