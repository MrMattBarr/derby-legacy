import useRole from "contexts/RoleContext";
import { useColors } from "hooks/useColorScheme";
import React from "react";
import { generateStyles } from "./styles";

import BigButton from "components/Buttons/BigButton";
import Loading from "components/Loading";
import Nothing from "components/Nothing";
import { NavPage } from "constants/Navigation";
import useAppNav, { NavArgKey } from "contexts/NavigationContext";
import useOffer from "contexts/OfferContext";
import useProject from "contexts/ProjectContext";
import { observer } from "mobx-react";

const RoleButton = observer(() => {
  const { element: offer, isOwner, acceptOffer } = useOffer();
  const { element: project } = useProject();
  const { getDeepLink, shareMessage } = useAppNav();
  const { role } = useRole();
  const colors = useColors();
  if (!role || !offer) {
    return <Loading />;
  }
  const { element } = generateStyles(colors);

  const onShare = async () => {
    const deepLink = getDeepLink({
      page: NavPage.PROJECTS,
      argKey: NavArgKey.OFFER,
      id: offer.id,
    });

    const message = `Congratulations! You've been offered the role of "${role.name}" in the project "${project?.title}".\n\n ${deepLink}`;
    shareMessage({ message });
  };

  if (!isOwner) {
    return (
      <BigButton
        icon="check"
        label="Accept"
        style={{ ...element, backgroundColor: colors.Backgrounds.success }}
        onPress={onShare}
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

export default RoleButton;
