import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from "expo-clipboard";
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/theme';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const [result, setResult] = useState("")

  function handleScan({ data }) {
    setScanned(true)
    setResult(data)
  }

  function handleClean() {
    setScanned(false)
    setResult("")
  }

  async function handleCopy() {
    if (!result) return

    await Clipboard.setStringAsync(result)

    alert("Copiado!")
  }

  if (!permission) {
    return <View style={globalStyles.containerPrincipal} />
  }

  if (!permission.granted) {
    return (
      <View style={[globalStyles.containerPrincipal, { gap: 20 }]}>
        <Text style={{ color: "#FFF" }} >É preciso de permissão para acessar a câmera</Text>
        <TouchableOpacity onPress={requestPermission} style={globalStyles.button}>
          <Text style={{ color: "#FFF" }}>Permitir</Text>
        </TouchableOpacity>
      </View >
    )
  }

  return (
    <View style={[globalStyles.containerPrincipal, { gap: 20 }]}>

      <Text style={{ color: "#FFF", fontWeight: "bold" }}>
        Aponte a câmera para um QR Code:
      </Text>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scanned ? undefined : handleScan}
        />

        {scanned && (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>QR Code lido</Text>
            <Text style={styles.overlaySubtitle}>
              Toque em "Limpar" para escanear outro.
            </Text>
          </View>
        )}
      </View>

      <Text style={{ color: "#FFF", fontWeight: "bold" }}>
        Resultado:
      </Text>

      <View style={styles.resultContainer}>

        <Text selectable style={{ color: "#FFF" }}>
          {result || "Nenhum QR Code lido"}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCopy} style={[globalStyles.button, { flex: 1 }]}>
          <Text style={{ color: "#FFF" }}>Copiar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClean} style={[globalStyles.button, { flex: 1 }]}>
          <Text style={{ color: "#FFF" }}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    aspectRatio: 1,
  },
  buttonContainer: {
    gap: 10,
    flexDirection: "row",
    width: "100%"
  },
  resultContainer: {
    padding: 10,
    height: 100,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  cameraContainer: {
    width: "100%",
    aspectRatio: 1,
    maxWidth: 400,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  overlayTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  overlaySubtitle: {
    color: "#FFF",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
})
