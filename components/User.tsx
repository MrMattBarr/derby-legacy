import { StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import Avatar from "../components/Avatar";
import { SpotsProvider } from "../contexts/SpotsContext";

export default function User() {
  return (
    <SpotsProvider>
      <Avatar />
      <Text>User Name</Text>
    </SpotsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
