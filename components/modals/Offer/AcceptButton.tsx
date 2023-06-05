import useRole from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { generateStyles } from "./styles";

import BigButton from "components/Buttons/BigButton";
import Loading from "components/Loading";
import { NavPage } from "constants/Navigation";
import useAppNav, { NavArgKey } from "contexts/NavigationContext";
import useOffer from "contexts/OfferContext";
import useProject from "contexts/ProjectContext";
import { observer } from "mobx-react";
import { OfferStatus } from "types/Offer";
import AppText from "components/Controls/Text";
import { useOffers } from "stores/OffersStore";
import { View } from "react-native";

const AcceptButton = observer(() => {
  const { project: offer, isOwner, acceptOffer } = useOffer();
  const { project } = useProject();
  const { getDeepLink, shareMessage } = useAppNav();
  const { role } = useRole();
  const colors = useColors();
  const offerStore = useOffers();
  if (!role || !offer) {
    return <Loading />;
  }
  const { element, centered } = generateStyles(colors);

  const onShare = async () => {
    const deepLink = getDeepLink({
      page: NavPage.PROJECTS,
      argKey: NavArgKey.OFFER,
      id: offer.id,
    });

    offerStore.update({
      id: offer.id,
      status: OfferStatus.PENDING,
    });
    const message = `Congratulations! You've been offered the role of "${role.name}" in the project "${project?.title}".\n\n ${deepLink}`;
    shareMessage({ message });
  };

  const placeholderMessage = {
    [OfferStatus.ACCEPTED]: "Offer Accepted",

    [OfferStatus.DECLINED]: "Offer Declined",

    [OfferStatus.REVOKED]: "Offer Revoked",
  };

  if (offer.status !== OfferStatus.PENDING) {
    console.log({ fish: placeholderMessage[offer.status] });
    return (
      <View style={centered}>
        <AppText header style={{ color: colors.Text.subtle }}>
          {placeholderMessage[offer.status]}
        </AppText>
      </View>
    );
  }

  if (!isOwner) {
    return (
      <BigButton
        label="Accept"
        style={{
          ...element,
          backgroundColor: colors.Backgrounds.complete,
        }}
        onPress={acceptOffer}
      />
    );
  }
  return (
    <BigButton
      icon="mail"
      label="Offer Role"
      style={element}
      onPress={onShare}
    />
  );
});

export default AcceptButton;
