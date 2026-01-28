import { userContext } from "@/app/background/Users";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../firebase";
export default function Dash() {
    const user = useContext(userContext);
    return(
        <SafeAreaView>
            <Text>Hello {user.userData.name}</Text>
            <TouchableOpacity 
                onPress={() => {auth.signOut()}}
            ><Text>Log out</Text></TouchableOpacity>
        </SafeAreaView>
    );
}