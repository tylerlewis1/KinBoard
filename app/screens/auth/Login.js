import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyle from "../../styles/auth/global";
export default function Login(){
    const nav = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signin = async() => {
        if(email == "" || password == ""){
            alert("You must enter a user name and a password");
            return;
        }

    }
    return(
        <SafeAreaView>
            {/* <Text style={globalstyle.header}>Kin Board</Text> */}
            <Image style={globalstyle.logo} source={require("../../../assets/images/logotb.png")}/>
            <View>
                <TextInput
                    value={email}
                    onChange={setEmail}
                    placeholder="Email"
                    style={globalstyle.txtinput}
                />
                <TextInput
                    value={password}
                    onChange={setPassword}
                    placeholder="Password"
                    style={globalstyle.txtinput}
                    secureTextEntry={true}
                    autoComplete="current-password"
                />
            </View>
            <TouchableOpacity 
            style={globalstyle.button}
            onPress={signin}
            ><Text style={globalstyle.buttontxt}>Sign in</Text></TouchableOpacity>

            <TouchableOpacity
                onPress={() => {nav.navigate("Signup")}}
            ><Text style={globalstyle.buttontxt}>Don't have a account?</Text></TouchableOpacity>
        </SafeAreaView>
    )
}