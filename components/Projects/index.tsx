import Page from "components/Page";
import { ModalKey, useModal } from "contexts/ModalContext";
import { UserProvider } from "contexts/UserContext";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useAuth } from "stores/AuthStore";
import { ParameterPage } from "types/ParameterPage";
import Header from "./Header";
import ProejctList from "./ProjectList";
import RoleList from "./RoleList";
import LoadingPage from "components/Loading/LoadingPage";
import Loading from "components/Loading";
import useAppNav from "contexts/NavigationContext";
import { NavPage } from "constants/Navigation";

const Projects = observer((args?: ParameterPage) => {
  const authStore = useAuth();
  const { go } = useAppNav();
  const offer: string = (args?.route?.params as any)?.offer;
  const { setModal, modal } = useModal();
  const id = args?.route?.params?.id ?? authStore.user?.uid;
  useEffect(() => {
    if (!id) {
      go(NavPage.WELCOME);
    } else if (!!offer) {
      setModal(ModalKey.OFFER, { offerId: offer });
    }
  }, [id, offer]);
  if (!id) {
    setTimeout(() => {
      go(NavPage.WELCOME);
    }, 500);
    return <LoadingPage />;
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
