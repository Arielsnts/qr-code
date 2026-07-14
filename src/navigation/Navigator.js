import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import GeneratorScreen from "../screens/GeneratorScreen";
import ScannerScreen from "../screens/ScannerScreen";

const Stack = createNativeStackNavigator()

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#2B83D4" },
        headerTintColor: "#FFF",
        headerTitleStyle: { fontWeight: "bold"}
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "QR Code Scanner"
        }}
      />
      <Stack.Screen
        name="GeneratorScreen"
        component={GeneratorScreen}
        options={{
          title: "Gerar um QR Code"
        }}
      />
      <Stack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          title: "Escanear um QR Code"
        }}
      />
    </Stack.Navigator>
  )
}