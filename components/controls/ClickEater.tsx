import React from "react";
import { GestureResponderEvent, Pressable } from "react-native";

const eatClick = (event: GestureResponderEvent) => {
  console.log("yum");
  event.preventDefault();
  event.stopPropagation();
};

const ClickEater = (props: any) => {
  const style = { ...props.style, cursor: "default" };
  return <Pressable {...props} onPress={eatClick} style={style} />;
};

export default ClickEater;
