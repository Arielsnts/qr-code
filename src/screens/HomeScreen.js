import { View, Text } from "react-native";
import { Button } from "@react-navigation/elements";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button screen={"GeneratorScreen"}>Gerar QR Code</Button>
      <Button screen={"ScannerScreen"}>Escanear QR Code</Button>
    </View>
  );
}
