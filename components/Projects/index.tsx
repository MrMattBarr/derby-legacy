import Page from "components/Page";
import { UserProvider } from "contexts/UserContext";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useAuth } from "stores/AuthStore";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import ProejctList from "./ProjectList";
import RoleList from "./RoleList";
import { ModalKey, useModal } from "contexts/ModalContext";
import { NavPage } from "constants/Navigation";
import useAppNav from "contexts/NavigationContext";

const Projects = observer((args?: ParameterPage) => {
  const authStore = useAuth();
  const offer: string = (args?.route?.params as any)?.offer;
  const { setModal, modal } = useModal();
  const { go } = useAppNav();
  useEffect(() => {
    if (offer) {
      console.log({ offer });
      setModal(ModalKey.OFFER, { offerId: offer });
      console.log("hill");
      go(NavPage.PROJECTS);
    }
  }, [offer]);
  const id = args?.route?.params?.id ?? authStore.user?.uid;
  if (!id) {
    return <></>;
  }
  return (
    <UserProvider id={id}>
      <Page unpadded>
        <Header />
        <ProejctList />
        <RoleList />
      </Page>
    </UserProvider>
  );
});

export default Projects;
