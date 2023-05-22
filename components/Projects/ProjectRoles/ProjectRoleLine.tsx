import AppText from "components/Controls/Text";
import Loading from "components/Demo/Loading";

import BigButton from "components/Buttons/BigButton";
import { View } from "components/Themed";
import { useModal } from "contexts/ModalContext";
import useProject from "contexts/ProjectContext";
import useRole, { RoleProvider } from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react-lite";
import React from "react";
import { Pressable } from "react-native";
import { useOffers } from "stores/OffersStore";
import { useRoles } from "stores/RolesStore";
import { Sizes } from "styles/sizes";
import { Offer } from "types/Offer";
import { Role } from "types/Role";
import CastRoleSummary from "./CastRoleSummary";
import { generateStyles } from "./styles";
import { ModalKey } from "config/ModalKeys";

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
