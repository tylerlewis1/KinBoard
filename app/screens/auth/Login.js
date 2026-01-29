import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../firebase";
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
        try{
        await signInWithEmailAndPassword(auth, email, password).then((user) => {
            console.log(auth.currentUser.uid);
        })
        } catch(e){
            if(e.code == "auth/invalid-credential"){
                alert("invalid user name or password");
                return;
            }
            alert("There was a issue loging in");
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
                    onChangeText={setEmail}
                    placeholder="Email"
                    style={globalstyle.txtinput}
                    placeholderTextColor="black"
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    style={globalstyle.txtinput}
                    secureTextEntry={true}
                    autoComplete="current-password"
                    placeholderTextColor="black"
                />
            </View>
            <TouchableOpacity 
            style={globalstyle.button}
            onPress={signin}
            ><Text style={globalstyle.buttontxt}>Sign in</Text></TouchableOpacity>

            <TouchableOpacity
                onPress={() => {nav.navigate("Signup")}}
            ><Text style={[globalstyle.buttontxt, {color: "#FF6F61"}]}>Don't have a account?</Text></TouchableOpacity>
        </SafeAreaView>
    )
}