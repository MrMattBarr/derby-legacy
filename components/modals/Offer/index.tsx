import BigButton from "components/Buttons/BigButton";
import TextButton from "components/Buttons/TextButton";
import AppText from "components/Controls/Text";
import Loading from "components/Demo/Loading";
import { NavPage } from "constants/Navigation";
import { ModalKey, useModal } from "contexts/ModalContext";
import useAppNav from "contexts/NavigationContext";
import useOffer, { OfferProvider } from "contexts/OfferContext";
import { RoleProvider } from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { useOffers } from "stores/OffersStore";
import { useRoles } from "stores/RolesStore";
import Description from "./Description";
import RoleSummary from "./RoleSummary";
import { generateStyles } from "./styles";

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

  const { page, headerBar, body, element, selfRoleButton } =
    generateStyles(colors);

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
          <BigButton icon="mail" label="Offer Role" style={element} />
          <Description />
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
