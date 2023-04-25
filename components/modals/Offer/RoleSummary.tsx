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

const RoleSummary = () => {
  const { role } = useRole();
  const { element: offer } = useOffer();
  const colors = useColors();
  const { summary, line } = generateStyles(colors);
  if (!role || !offer) {
    return <Loading />;
  }
  const lineIds = role.lines;
  const roleDt = DateTime.fromMillis(role.dueDate);
  const offerCreatedDt = DateTime.fromMillis(offer?.created);
  return (
    <View style={summary}>
      <View>
        <View style={line}>
          <AppText bold style={{ marginRight: Sizes.Spacings.SMALL }}>
            Due:
          </AppText>
          <AppText>{roleDt.toFormat("DDDD")}</AppText>
        </View>
        <View style={line}>
          <AppText bold style={{ marginRight: Sizes.Spacings.SMALL }}>
            Line Count:
          </AppText>
          <AppText>{`${lineIds.length}`}</AppText>
        </View>
        <View style={line}>
          <AppText bold style={{ marginRight: Sizes.Spacings.SMALL }}>
            Offered:
          </AppText>
          <AppText>{offerCreatedDt.toFormat("DDDD t")}</AppText>
        </View>
      </View>
    </View>
  );
};

export default RoleSummary;
