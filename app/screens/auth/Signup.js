import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyle from "../../styles/auth/global";
export default function Signup(){
    const nav = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const signup = async() => {
        if(email == "" || password == "" || name == ""){
            alert("You must fill out all fields");
            return;
        }

    }
    return(
        <SafeAreaView>
            {/* <Text style={globalstyle.header}>Kin Board</Text> */}
            <Image style={globalstyle.logo} source={require("../../../assets/images/logotb.png")}/>
            <View>
                 <TextInput
                    value={name}
                    onChange={setName}
                    placeholder="Name"
                    style={globalstyle.txtinput}
                />
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
            onPress={signup}
            ><Text style={globalstyle.buttontxt}>Sign up</Text></TouchableOpacity>

            <TouchableOpacity
                onPress={() => {nav.navigate("Login")}}
            ><Text style={globalstyle.buttontxt}>Have a account?</Text></TouchableOpacity>
        </SafeAreaView>
    )
}