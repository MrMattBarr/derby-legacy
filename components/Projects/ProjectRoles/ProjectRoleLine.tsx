import AppText from "components/Controls/Text";
import Loading from "components/Demo/Loading";

import { View } from "components/Themed";
import useRole, { RoleProvider } from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { generateStyles } from "./styles";
import { UserProvider } from "contexts/UserContext";
import Avatar from "components/Avatar";
import { ro } from "date-fns/locale";
import { Sizes } from "styles/sizes";
import CastRoleSummary from "./CastRoleSummary";
import { Pressable } from "react-native";
import BigButton from "components/Buttons/BigButton";
import useProject from "contexts/ProjectContext";
import { Offer, OfferStatus } from "types/Offer";
import { useOffers } from "stores/OffersStore";
import { useRoles } from "stores/RolesStore";
import { observer } from "mobx-react-lite";
import { Role } from "types/Role";
import { ModalKey, useModal } from "contexts/ModalContext";

const ProjectRoleSummary = observer(() => {
  const { role } = useRole();
  const OfferStore = useOffers();
  const roleStore = useRoles();
  const { setModal } = useModal();

  const { element: project } = useProject();

  const colors = useColors();
  const { roleLine, uncastAvatar } = generateStyles(colors);
  const lineWord = role?.lines.length === 1 ? "line" : "lines";
  if (!role) {
    return <Loading />;
  }
  if (role.talent) {
    return <CastRoleSummary talent={role.talent} />;
  }

  const createOffer = async () => {
    console.log("invite");
    const offer: Partial<Offer> = {
      created: new Date().getTime(),
      role: role.id,
      owner: project?.owner,
    };
    const fullOffer = await OfferStore.create(offer);
    const updatedRole: Partial<Role> = {
      id: role.id,
      offer: fullOffer.id,
    };
    roleStore.update(updatedRole);
  };

  const viewOffer = async () => {
    setModal(ModalKey.OFFER, { offerId: role.offer });
  };

  return (
    <Pressable style={roleLine}>
      <View style={uncastAvatar}></View>
      <View>
        <AppText header>{role.name}</AppText>
        <AppText style={{ color: colors.Text.subtle }}>{`${
          role.lines.length ?? 0
        } ${lineWord}`}</AppText>
        {!role.offer && (
          <BigButton
            style={{ marginTop: Sizes.Spacings.SMALL }}
            icon="forward"
            compact
            onPress={createOffer}
            label="Create Role Offer"
          />
        )}
        {!!role.offer && (
          <BigButton
            style={{ marginTop: Sizes.Spacings.SMALL }}
            icon="newsletter"
            compact
            onPress={viewOffer}
            label="Offer"
          />
        )}
      </View>
    </Pressable>
  );
});

const ProjectRoleLine = ({ id }: { id: string }) => {
  if (!id) {
    return <Loading />;
  }

  return (
    <RoleProvider id={id}>
      <ProjectRoleSummary />
    </RoleProvider>
  );
};

export default ProjectRoleLine;
