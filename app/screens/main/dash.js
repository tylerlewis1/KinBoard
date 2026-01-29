import { userContext } from "@/app/background/Users";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../styles/main/dash";
import HouseHolds from "./comps/households";
export default function Dash() {
    const nav = useNavigation();
    const { width, height } = Dimensions.get("window");
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);
    const user = useContext(userContext);
    return(
        <SafeAreaView>
            <View style={style.header}>
                <TouchableOpacity 
                onPress={() => {nav.navigate("Account")}}
                >
                    <Ionicons name="settings" size={hp(5)} style={style.settings} />
                </TouchableOpacity>
            </View>
            <View style={style.content}>
                <View style={style.top}>
                    <Text style={style.greeting}>Hi <Text style={{color: "#2EC4B6"}}>{user.userData.name}!</Text></Text>
                </View>
                <View style={style.main}>
                    <HouseHolds userdata={user.userData}/>
                </View>
            </View>
        </SafeAreaView>
    );
}