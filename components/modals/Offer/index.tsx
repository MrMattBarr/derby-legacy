import { useColors } from "hooks/useColorScheme";
import React from "react";
import { Text, View } from "react-native";
import { modalStyles } from "../styles";
import { observer } from "mobx-react";
import AppText from "components/Controls/Text";
import { useModal } from "contexts/ModalContext";
import { generateStyles } from "./styles";
import BigButton from "components/Buttons/BigButton";
import { OfferStore, useOffers } from "stores/OffersStore";
import Loading from "components/Demo/Loading";
import { useAuth } from "stores/AuthStore";
import useOffer, { OfferProvider } from "contexts/OfferContext";
import { useRoles } from "stores/RolesStore";
import { RoleProvider } from "contexts/RoleContext";
import RoleSummary from "./RoleSummary";

const WrappedModal = observer(() => {
  const colors = useColors();
  const { element: offer } = useOffer();
  const roleStore = useRoles();
  const authStore = useAuth();

  const self = authStore.user?.uid;
  const role = offer ? roleStore.things[offer.role] : undefined;
  if (!offer || !role) {
    return <Loading />;
  }

  const headerText = role.name;
  console.log({ headerText, role });
  const isOwner = offer.owner === self;
  const stringContent = isOwner
    ? "you own this rolex"
    : "You might own this role";
  const { page, headerBar, body } = generateStyles(colors);

  if (!self) {
    <View style={page}>
      <View style={headerBar}>
        <AppText>Role Offer</AppText>
      </View>
      <AppText>You are logged out</AppText>
    </View>;
  }
  return (
    <RoleProvider id={role.id}>
      <View style={page}>
        <View style={headerBar}>
          <AppText header>{headerText}</AppText>
        </View>
        <View style={body}>
          <RoleSummary />
          <BigButton icon="mail" label="Share" />
        </View>
      </View>
    </RoleProvider>
  );
});

const OfferModal = observer(() => {
  const offerStore = useOffers();
  const {
    modalArgs: { offerId },
  } = useModal();
  if (!offerId) {
    return <Loading />;
  }

  return (
    <OfferProvider store={offerStore} id={offerId}>
      <WrappedModal />
    </OfferProvider>
  );
});

export default OfferModal;
