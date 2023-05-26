import BigButton from "components/Buttons/BigButton";
import AppText from "components/Controls/Text";
import Loading from "components/Demo/Loading";
import { NavPage } from "constants/Navigation";
import { useModal } from "contexts/ModalContext";
import useAppNav, { NavArgKey } from "contexts/NavigationContext";
import useOffer, { OfferProvider } from "contexts/OfferContext";
import { RoleProvider } from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "stores/AuthStore";
import { useOffers } from "stores/OffersStore";
import { useProjects } from "stores/ProjectsStore";
import { useRoles } from "stores/RolesStore";
import Description from "./Description";
import RoleSummary from "./RoleSummary";
import { generateStyles } from "./styles";
import RoleButton from "./RoleButton";
import { ProjectProvider } from "contexts/ProjectContext";

const WrappedModal = observer(() => {
  const colors = useColors();
  const { element: offer, isOwner } = useOffer();
  const roleStore = useRoles();
  const projectStore = useProjects();
  const authStore = useAuth();

  const self = authStore.user?.uid;
  const role = offer ? roleStore.things[offer.role] : undefined;
  const project = role ? projectStore.things[role.project] : undefined;

  useEffect(() => {
    if (role?.project) {
      projectStore.load(role?.project);
    }
  }, [role]);
  if (!offer || !role || !project) {
    return <Loading />;
  }

  const headerText = role.name;

  const { page, headerBar, body } = generateStyles(colors, { isOwner });

  if (!self) {
    <View style={page}>
      <View style={headerBar}>
        <AppText>Role Offer</AppText>
      </View>
      <AppText>You are logged out</AppText>
    </View>;
  }
  return (
    <ProjectProvider store={projectStore} id={project.id}>
      <RoleProvider id={role.id}>
        <View style={page}>
          <View style={headerBar}>
            <AppText header>{headerText}</AppText>
          </View>
          <View style={body}>
            <RoleSummary />
            <RoleButton />
            <Description />
          </View>
        </View>
      </RoleProvider>
    </ProjectProvider>
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
