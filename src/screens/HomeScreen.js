import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { theme } from "../styles/theme";
import { Button } from "@react-navigation/elements";

export default function HomeScreen() {
  return (
    <View style={globalStyles.containerPrincipal}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Gere um QR Code de forma rápida e simples</Text>
        <Text
          style={[styles.mainText, {color: theme.colors.primary}]}>
          OU
        </Text>
        <Text style={styles.mainText}>Escaneie um QR Code em poucos cliques</Text>
      </View>

      <Button
        color="#FFF"
        style={globalStyles.button}
        screen={"GeneratorScreen"}>
        Gerar QR Code
      </Button>

      <Button
        color="#FFF"
        style={globalStyles.button}
        screen={"ScannerScreen"}>
        Escanear QR Code
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 20
  },
  mainText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  }
})