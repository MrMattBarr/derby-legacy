import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const GEAR_SIZE = 45;
const Gear = ({
  size,
  padding,
  background,
}: {
  size: number;
  padding: number;
  background: string;
}) => (
  <Svg
    viewBox="0 0 585 585"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 1.5,
      padding: padding ?? 5,
      width: size,
      height: size,
      zIndex: 3,
    }}
  >
    <Circle
      cx={531.893}
      cy={1339.49}
      r={110.093}
      fill={background}
      transform="translate(-879.27 -2658.3) scale(2.20285)"
    />
    <Path
      d="M609.643 1135.18c161.387 0 292.413 131.02 292.413 292.41 0 161.39-131.026 292.41-292.413 292.41S317.23 1588.98 317.23 1427.59c0-161.39 131.026-292.41 292.413-292.41Zm-175.976 458.88c40.144 40.47 84.529 65 133.655 71.71l15.474-60.32c19.85 2.69 41.057 2.3 63.951-1.91l18.26 59.64c49.116-11.44 92.824-36.23 129.182-79.15l-45.055-43.46c13.685-18.57 23.703-36.89 30.728-54.99l60.777 14.32c14.579-50.73 16.055-101.04-1.795-150.71l-60.879 15.13c-9.277-21.29-19.757-39.82-32.12-54.04l43.608-45.26c-35.198-38.98-79.306-64.35-132.785-75.35l-18.007 60.46c-21.953-3.02-43.301-2.18-64.263 1.13l-18.013-60.29c-47.855 11.02-92.087 34.89-130.446 78.36l44.368 44.68c-10.573 13.1-20.723 31.48-30.502 54.49l-61.758-11.27c-16.001 52.79-13.472 102.95 3.19 151.11l62.101-12.35c8.698 20.3 19.367 35.41 30.48 49.35l-40.151 48.72Z"
      style={{
        fill: "#80806d",
      }}
      transform="translate(-317.23 -1135.18)"
    />
  </Svg>
);

export default Gear;
