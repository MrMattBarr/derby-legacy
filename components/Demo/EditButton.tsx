import { useLinkTo } from "@react-navigation/native";
import React from "react";
import useDemo from "../../contexts/DemoContext";
import IconButton, { IIconButton } from "../IconButton";

const EditButton = (options: Partial<IIconButton>) => {
  const linkTo = useLinkTo();
  const { demo } = useDemo();
  const onEdit = () => {
    linkTo(`/demos/${demo!.id}/edit`);
  };
  return (
    <IconButton
      size={40}
      onPress={onEdit}
      icon="edit"
      label="EDIT"
      borderless
      {...options}
    />
  );
};

export default EditButton;
