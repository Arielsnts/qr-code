import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import { globalStyles } from "../styles/globalStyles";
import { theme } from "../styles/theme";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function GeneratorScreen() {
  const [text, setText] = useState("")
  const [qrValue, setQrValue] = useState("")

  const qrRef = useRef(null)

  function handleGenerate() {
    if (text.trim() === "") {
      alert("Digite um texto antes de gerar o QR Code!")
      return
    }
    setQrValue(text)
  }

  function handleClean() {
    setQrValue("")
    setText("")
  }

  async function handleSave() {
    const { status } = await MediaLibrary.requestPermissionsAsync()

    qrRef.current.toDataURL(async (base64) => {
      const fileUri =
        FileSystem.cacheDirectory + `qrcode-${Date.now()}.png`

      try {
        await FileSystem.writeAsStringAsync(
          fileUri,
          base64,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        )

        const asset = await MediaLibrary.createAssetAsync(fileUri);

        alert("Salvo!")
      } catch (e) {
        console.log(e)
        alert(String(e))
      }
    })
  }

  return (
    <View style={[globalStyles.containerPrincipal, { gap: 20 }]}>
      <Text style={{ fontWeight: "bold", color: "#FFF" }}>Digite o texto:</Text>

      <TextInput
        multiline
        numberOfLines={4}
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Digite o conteúdo do seu QR Code"
        placeholderTextColor="#ffffff31"
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleGenerate}
      >
        <Text style={{ color: "#FFF" }}>Gerar QR Code</Text>
      </TouchableOpacity>

      <View style={styles.qrCodeContainer}>
        {qrValue ? (
          <QRCode
            getRef={(c) => (qrRef.current = c)}
            value={qrValue}
            size={200}
            color="black"
            backgroundColor="white"
          />
        ) : (
          <Text style={styles.placeholderText}>
            Seu QR Code aparecerá aqui
          </Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleSave} style={[globalStyles.button, { flex: 1 }]}>
          <Text style={{ color: "#FFF" }}>Baixar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClean} style={[globalStyles.button, { flex: 1 }]}>
          <Text style={{ color: "#FFF" }}>Limpar</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 100,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    color: "#FFF",
    textAlignVertical: 'top',
  },
  qrCodeContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: "#FFF",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  buttonsContainer: {
    gap: 10,
    flexDirection: "row",
    width: "100%"
  }
})