
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../styles/editscreens/addCircle";
export default function AddCircle(){
    const [name, setName] = useState("");
    const nav = useNavigation();
    return(
        <SafeAreaView>
            <View style={style.top}>
                <TouchableOpacity
                    onPress={() => {
                        setName("");
                        nav.goBack();
                    }}
                    style={{padding: 12}}
                >
                    <Ionicons name="arrow-back" size="24" />
                </TouchableOpacity>
                <Text style={style.txt}>Create Circle</Text>
            </View>
            <View>
                <TouchableOpacity 
                    style={[style.btn, {backgroundColor: "#2EC4B6"}]}
                ><Text style={style.btntxt}>Create Circle</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}