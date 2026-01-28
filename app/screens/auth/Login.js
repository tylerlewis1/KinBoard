import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyle from "../../styles/auth/global";
export default function Login(){
    return(
        <SafeAreaView>
            <Text style={globalstyle.header}>Kin Board</Text>

        </SafeAreaView>
    )
}