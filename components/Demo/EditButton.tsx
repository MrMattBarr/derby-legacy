import React from "react";
import IconButton from "../IconButton";

const EditButton = () => {
  const onEdit = () => {
    console.log("edit");
  };
  return <IconButton inverted size={40} onPress={onEdit} icon="edit" />;
};

export default EditButton;
