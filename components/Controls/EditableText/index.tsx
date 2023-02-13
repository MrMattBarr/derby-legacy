import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

interface IEditableText {
  text?: string;
  canEdit: boolean;
  onCommit: (value: string) => void;
}

const EditableText = ({ text, canEdit, onCommit }: IEditableText) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const colors = useColors();
  const inputRef = useRef<TextInput>(null);
  const styles = generateStyles(colors, { canEdit });
  const submit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    setEditing(false);
    onCommit(e.nativeEvent.text);
  };
  const commit = () => {
    setEditing(false);
    if (draft) {
      onCommit(draft);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);
  return (
    <View style={styles.holder}>
      {!editing && (
        <Pressable style={styles.pressable} onPress={() => setEditing(true)}>
          <Text style={styles.text}>{text}</Text>
          {canEdit && (
            <Entypo
              style={styles.icon}
              name="edit"
              color={colors.Text.default}
            />
          )}
        </Pressable>
      )}
      {editing && (
        <>
          <TextInput
            selectTextOnFocus
            ref={inputRef}
            style={styles.input}
            defaultValue={text}
            onChangeText={setDraft}
            placeholder="Aa…"
            onSubmitEditing={submit}
          />
          <Pressable style={styles.saveButton} onPress={commit}>
            <Entypo
              style={styles.buttonIcon}
              name="check"
              color={colors.Text.default}
            />
          </Pressable>
          <Pressable
            style={styles.cancelButton}
            onPress={() => {
              setEditing(false);
            }}
          >
            <Text style={styles.buttonIcon}>X</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default EditableText;
