import useRole from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { generateStyles } from "./styles";

import Nothing from "components/Nothing";
import useOffer from "contexts/OfferContext";
import TextButton from "components/Buttons/TextButton";

const Description = () => {
  const { project: offer, isOwner, acceptOffer } = useOffer();
  const colors = useColors();
  const { selfRoleButton } = generateStyles(colors);
  if (!isOwner) {
    return <Nothing />;
  }
  return (
    <TextButton
      style={selfRoleButton}
      onPress={acceptOffer}
      label="Assign Role to Self"
    />
  );
};

export default Description;
