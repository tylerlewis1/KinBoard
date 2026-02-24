import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppColors from "@/app/background/Colors";
import { userContext } from "@/app/background/Users";
import { useStyles } from "../addCircle/addCircle.styles"; // Reuse the creation styles for consistency
import { JoinService } from "./joinCircle.services";
import QrCodeScanner from "./qrcodescanner";

export default function JoinCircle() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { userData } = useContext(userContext);
  const nav = useNavigation();
  const colors = useAppColors();
  const styles = useStyles(colors);

  const handleJoin = async () => {
    if (!code.trim()) {
      Alert.alert("Error", "Please enter a valid circle code.");
      return;
    }

    // Check local context first to save a database call
    if (userData.circles.includes(Number(code))) {
      Alert.alert("Already a Member", "You are already in this circle.");
      return;
    }

    setLoading(true);
    try {
      await JoinService.joinCircleByCode(code, userData);
      nav.navigate("Home");
    } catch (e) {
      Alert.alert("Oops!", e.message === "Circle not found" ? "That code doesn't exist." : "Could not join circle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Ionicons name="arrow-back" size={28} color={colors.txt} />
        </TouchableOpacity>
        <Text style={styles.title}>Join a Circle</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* QR Scanner Section */}
        <View style={{ width: '90%', height: 300, borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
          <QrCodeScanner setCode={setCode} />
        </View>

        <Text style={{ color: colors.txt, marginVertical: 30, opacity: 0.5, fontWeight: 'bold' }}>
          — OR ENTER CODE MANUALLY —
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="8-Digit Code"
            style={styles.input}
            placeholderTextColor={colors.offtxt}
            keyboardType="number-pad"
          />
        </View>

        <TouchableOpacity 
          style={[styles.createBtn, { opacity: loading ? 0.6 : 1 }]} 
          onPress={handleJoin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.btnText}>Join Circle</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}