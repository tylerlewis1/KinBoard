import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppColors from "@/app/background/Colors";
import { userContext } from "@/app/background/Users";
import { CircleService } from "./addCircle.services";
import { useStyles } from "./addCircle.styles";

export default function AddCircle() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [circleId, setCircleId] = useState(null);

  const { userData } = useContext(userContext);
  const colors = useAppColors();
  const styles = useStyles(colors);
  const nav = useNavigation();

  useEffect(() => {
    setCircleId(Math.floor(Math.random() * 100000000));
  }, []);

  const handlePickImg = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "We need photo access to set a cover.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1], // Square is better for UI consistency
      quality: 0.3,
      width: 300, // Optimize dimensions here!
      height: 300,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        const url = await CircleService.uploadCover(result.assets[0].uri, circleId);
        setImageUrl(url);
      } catch (e) {
        Alert.alert("Error", "Failed to upload image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Missing Name", "Please give your circle a name.");
      return;
    }

    setLoading(true);
    try {
      await CircleService.finalizeCircle(circleId, name, imageUrl, userData);
      nav.goBack();
    } catch (e) {
      Alert.alert("Error", "Could not create circle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Ionicons name="close" size={28} color={colors.txt} />
        </TouchableOpacity>
        <Text style={styles.title}>New Circle</Text>
      </View>

      <View style={styles.content}> 
        <TouchableOpacity onPress={handlePickImg} style={styles.imagePicker}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.coverImg} />
          ) : (
            <Ionicons name="camera" size={40} color={colors.txt} opacity={0.5} />
          )}
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={setName}
            placeholder="Circle Name"
            style={styles.input}
            placeholderTextColor={colors.offtxt}
            autoFocus
          />
        </View>

        <TouchableOpacity 
          style={styles.createBtn} 
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={styles.btnText}>Create Circle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}