import AsyncStorage from "@react-native-async-storage/async-storage";

interface KeyValuePair<Type> {
  key: string;
  value: Type;
}
const storeData = async <Type>({ key, value }: KeyValuePair<Type>) => {
  try {
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, serializedValue);
  } catch (e) {
    // saving error
  }
};

const loadData = async <Type>(key: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (!value) {
      return;
    } else {
      const parsedValue: Type = JSON.parse(value);
      return parsedValue;
    }
  } catch (e) {
    // saving error
  }
};
