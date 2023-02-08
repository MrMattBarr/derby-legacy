import { observer } from "mobx-react-lite";
import React from "react";
import useUser from "../../../contexts/UserContext";
import BigButton from "../../Buttons/BigButton";

const Preview = observer(({ src }: { src?: string }) => {
  const user = useUser();
  const saveImage = () => {
    user.update({ field: "avatar", value: src! });
  };
  return <BigButton onPress={saveImage} label="Confirm" disabled={!src} />;
});

export default Preview;
