import { useLinkTo } from "@react-navigation/native";
import React from "react";
import { AppColor } from "../../constants/Colors";
import useDemo from "../../contexts/DemoContext";
import { ModalKey, useModal } from "../../contexts/ModalContext";
import IconButton, { IIconButton } from "../IconButton";

const RecordButton = (options: Partial<IIconButton>) => {
  const modalStore = useModal();

  const openRecordingModal = () => {
    modalStore.setModal(ModalKey.RECORDING);
  };
  return (
    <IconButton
      size={40}
      onPress={openRecordingModal}
      icon="mic"
      label="EDIT"
      background={AppColor.CHALK_RED}
      color={AppColor.PURE_BLACK}
      border={AppColor.PURE_BLACK}
      {...options}
    />
  );
};

export default RecordButton;
