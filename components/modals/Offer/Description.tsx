import AppText from "components/Controls/Text";
import useRole from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { View } from "react-native";
import { generateStyles } from "./styles";
import { Sizes } from "styles/sizes";
import { DateTime } from "luxon";

import Loading from "components/Demo/Loading";
import useOffer from "contexts/OfferContext";

const Description = () => {
  const { role } = useRole();
  const { element: offer } = useOffer();
  const colors = useColors();
  const { description } = generateStyles(colors);
  if (!role || !offer) {
    return <Loading />;
  }
  const lineIds = role.lines;
  const roleDt = DateTime.fromMillis(role.dueDate);
  const offerCreatedDt = DateTime.fromMillis(offer?.created);
  return (
    <View style={description}>
      <AppText style={{ color: colors.Text.subtle }}>
        {role.description}
      </AppText>
    </View>
  );
};

export default Description;
