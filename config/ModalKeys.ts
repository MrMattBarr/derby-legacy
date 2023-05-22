import Nothing from "components/Nothing";
import AvatarUpload from "components/modals/AvatarUpload";
import OfferModal from "components/modals/Offer";
import RecordingModal from "components/modals/Recording";
import ScriptParser from "components/modals/ScriptParser";
import SpotEditorModal from "components/modals/SpotEditor";

export enum ModalKey {
  RECORDING = "recording",
  SPOT_EDITOR = "spotEditor",
  AVATAR_UPLOAD = "avatarUpload",
  OFFER = "offer",
  SCRIPT_PARSER = "scriptParser",
  NONE = "none",
}

export const ModalByKey: Record<ModalKey, () => JSX.Element> = {
  [ModalKey.RECORDING]: RecordingModal,
  [ModalKey.SPOT_EDITOR]: SpotEditorModal,
  [ModalKey.AVATAR_UPLOAD]: AvatarUpload,
  [ModalKey.OFFER]: OfferModal,
  [ModalKey.SCRIPT_PARSER]: ScriptParser,
  [ModalKey.NONE]: Nothing,
};
