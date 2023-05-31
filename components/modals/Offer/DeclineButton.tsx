import useRole from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { generateStyles } from "./styles";

import BigButton from "components/Buttons/BigButton";
import TextButton from "components/Buttons/TextButton";
import Loading from "components/Loading";
import Nothing from "components/Nothing";
import { ModalKey, useModal } from "contexts/ModalContext";
import useOffer from "contexts/OfferContext";
import { observer } from "mobx-react";
import { useOffers } from "stores/OffersStore";
import { OfferStatus } from "types/Offer";

const DeclineButton = observer(() => {
  const { offer: offer, isOwner, isActive } = useOffer();
  const { role } = useRole();
  const colors = useColors();
  const { setModal } = useModal();
  const offerStore = useOffers();
  if (!role || !offer) {
    return <Loading />;
  }
  const { cancelButton } = generateStyles(colors);

  const decline = () => {
    const update = {
      id: offer.id,
      status: OfferStatus.DECLINED,
    };
    offerStore.update(update, {
      success: () => {
        setModal(ModalKey.NONE);
      },
    });
  };

  const revoke = () => {
    const update = {
      id: offer.id,
      status: OfferStatus.REVOKED,
    };
    offerStore.update(update, {
      success: () => {
        setModal(ModalKey.NONE);
      },
    });
  };

  if (!isActive) {
    return <Nothing />;
  }
  if (!isOwner) {
    return (
      <TextButton style={cancelButton} onPress={decline} label="Decline" />
    );
  }
  return (
    <BigButton
      icon="mail"
      label="Cancel Offer"
      style={cancelButton}
      onPress={revoke}
    />
  );
});

export default DeclineButton;
