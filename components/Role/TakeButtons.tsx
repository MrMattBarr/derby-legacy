import IconButton from "components/IconButton";
import Nothing from "components/Nothing";
import useLine from "contexts/LineContext";
import useProject from "contexts/ProjectContext";
import useTake from "contexts/TakeContext";
import useTextBar from "contexts/TextBarContext";
import { useColors } from "hooks/useColorScheme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useLines } from "stores/LinesStore";
import { useTakes } from "stores/TakesStore";
import { Sizes } from "styles/sizes";
import { ApprovalStatus } from "types/Take";

const TakeButtons = observer(() => {
  const { take } = useTake();
  const { line } = useLine();
  const { setTextBarArgs } = useTextBar();
  const lineStore = useLines();
  const [updatingTake, setUpdatingTake] = useState(false);
  const [updatingLine, setUpdatingLine] = useState(false);
  const takeStore = useTakes();
  const { isOwner } = useProject();
  const colors = useColors();

  if (!isOwner) {
    return <Nothing />;
  }

  const approve = () => {
    setUpdatingTake(true);
    setUpdatingLine(true);
    if (!line?.id || !take?.id) {
      return;
    }
    const onUpdateTake = () => {
      setUpdatingTake(false);
    };
    const onUpdateLine = () => {
      setUpdatingLine(false);
    };
    takeStore.update(
      { id: take?.id, status: ApprovalStatus.APPROVED },
      { success: onUpdateTake }
    );
    lineStore.update(
      { id: line?.id, status: ApprovalStatus.APPROVED },
      { success: onUpdateLine }
    );
  };

  const giveNotes = () => {
    const onSubmit = (notes: string) => {
      takeStore.update({
        id: take?.id,
        status: ApprovalStatus.REJECTED,
        notes,
      });
    };
    setTextBarArgs({ placeholder: "Notes...", onSubmit });
  };

  const updating = updatingLine || updatingTake;

  if (line?.status === ApprovalStatus.APPROVED) {
    return <Nothing />;
  }

  return (
    <>
      {take?.status !== ApprovalStatus.REJECTED && (
        <IconButton
          onPress={giveNotes}
          icon="minus"
          loading={updating}
          style={{ marginRight: Sizes.Spacings.STANDARD }}
          background={colors.Backgrounds.default}
        />
      )}
      <IconButton
        onPress={approve}
        icon="thumbs-up"
        loading={updating}
        color={colors.Text.complete}
        background={colors.Backgrounds.default}
      />
    </>
  );
});
export default TakeButtons;
