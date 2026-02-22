import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppColors from "@/app/background/Colors";
import { userContext } from "@/app/background/Users";
import { auth } from "@/firebase";
import { AccountService } from "./account.services";
import { useStyles } from "./account.styles";

export default function Account() {
  const { userData } = useContext(userContext);
  const nav = useNavigation();
  const colors = useAppColors();
  const styles = useStyles(colors); // Pass your context colors here

  const handlePickImg = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      width: 500, 
      height: 500,    
    });

    if (!result.canceled) {
      try {
        await AccountService.uploadProfileImage(result.assets[0].uri);
        Alert.alert("Success", "Profile picture updated!");
      } catch (e) {
        Alert.alert("Error", "Failed to save image.");
      }
    }
  };

  const handleResetPass = async () => {
    try {
      await AccountService.sendResetEmail(userData.email);
      Alert.alert("Email Sent", "Check your inbox for instructions.");
    } catch (e) {
      Alert.alert("Error", "Could not send reset email.");
    }
  };

  const confirmDelete = () => {
    Alert.alert('Wait!', 'Delete your account forever?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => AccountService.deleteUserAccount(userData) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => nav.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={28} color={colors.txt} />
      </TouchableOpacity>

      <View style={styles.container}>
        <TouchableOpacity onPress={handlePickImg} style={styles.pfpContainer}>
          <Image
            cachePolicy="disk"
            style={styles.pfp}
            source={userData.pfp ? { uri: userData.pfp } : require("../../../../assets/images/dpfp.png")}
          />
        </TouchableOpacity>

        <Text style={styles.name}>{userData.name}</Text>

        <TouchableOpacity onPress={handleResetPass} style={[styles.btn, styles.resetBtn]}>
          <Text style={styles.btntxt}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => auth.signOut()} style={[styles.btn, styles.signOutBtn]}>
          <Text style={styles.btntxt}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDelete} style={[styles.btn, styles.deleteBtn]}>
          <Text style={[styles.btntxt, { color: '#FF6F61' }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}