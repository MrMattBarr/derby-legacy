import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { useColors } from "../../../hooks/useColorScheme";
import { generateStyles } from "./styles";

const Defaults = {
  PLACEHOLDER: `Aa…`,
  length: 5,
  keyExtractor: (x: any) => {
    if (typeof x === "string") {
      return x;
    }
    return x?.id;
  },
};

const DEFOCUS_TIME = 250;

interface ElementRenderer<Type> {
  element: Type;
  onSelect: (element: Type) => void;
}

interface ISearchSelector<Type> {
  items: Set<Type>;
  onSelect: (element: Type) => void;
  keyExtractor?: (element: Type) => string;
  renderElement: (props: ElementRenderer<Type>) => JSX.Element;
  match: (query: string, element: Type) => boolean;
  style?: object;
  length?: number;
  placeHolder?: string;
}

const SearchSelector = <Type extends unknown>({
  items,
  onSelect,
  match,
  keyExtractor,
  renderElement,
  style,
  placeHolder,
}: ISearchSelector<Type>) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const colors = useColors();
  const extractKey = keyExtractor ?? Defaults.keyExtractor;
  const Renderer = renderElement;
  const { defaultStyle, defaultInputStyle } = generateStyles(colors);
  const deFocus = () => {
    setTimeout(() => {
      setFocused(false);
    }, DEFOCUS_TIME);
  };
  const matchedItems = [...items].filter((x) => match(query, x));
  return (
    <View style={{ ...defaultStyle, ...style }}>
      <TextInput
        style={defaultInputStyle}
        placeholder={placeHolder ?? Defaults.PLACEHOLDER}
        onChangeText={setQuery}
        onFocus={() => setFocused(true)}
        onBlur={deFocus}
      />
      {focused ? (
        <View>
          {matchedItems.map((x) => (
            <Renderer key={extractKey(x)} element={x} onSelect={onSelect} />
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default SearchSelector;
