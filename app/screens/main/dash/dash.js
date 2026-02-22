import useAppColors from "@/app/background/Colors";
import { userContext } from "@/app/background/Users";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SlideUpModal from '../../circlescreens/comps/slidemodal';
import HouseHolds from "../comps/households";
import { getGreeting, handleNavigation } from "./dash.logic";
import { createStyles } from "./dash.styles";

export default function Dash() {
    const nav = useNavigation();
    const colors = useAppColors();
    const styles = createStyles(colors);
    
    const { userData } = useContext(userContext);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <SlideUpModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.sheetContent}>
                        <View style={styles.handle} />
                        <Text style={styles.sheetTitle}>Circle Management</Text>
                        
                        <TouchableOpacity 
                            style={[styles.actionButton, { backgroundColor: colors.accent }]} 
                            onPress={() => handleNavigation(nav, "JoinCircle", setModalVisible)}
                        >
                            <Entypo name="plus" size={20} color="white" style={{marginRight: 10}} />
                            <Text style={styles.actionButtonText}>Join a Circle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.actionButton, { backgroundColor: colors.compbg || "#011627" }]} 
                            onPress={() => handleNavigation(nav, "AddCircle", setModalVisible)}
                        >
                            <Entypo name="home" size={20} color="white" style={{marginRight: 10}} />
                            <Text style={styles.actionButtonText}>Create New Circle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: colors.txt, opacity: 0.6 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </SlideUpModal>

            {/* 2. HEADER */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greetingText}>{getGreeting()},</Text>
                    <Text style={styles.nameHighlight}>{userData.name}!</Text>
                </View>
                <TouchableOpacity onPress={() => nav.navigate("Account")} style={styles.settingsBtn}>      
                    <Entypo name="cog" color={colors.txt} size={28} />
                </TouchableOpacity>
            </View>

            {/* 3. MAIN CONTENT */}
            <View style={styles.main}>
                <HouseHolds userdata={userData} setModalVisible={setModalVisible} />
            </View>
        </SafeAreaView>
    );
}