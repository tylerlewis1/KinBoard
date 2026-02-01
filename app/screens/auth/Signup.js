import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../../firebase";
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
        try{
            await createUserWithEmailAndPassword(auth, email, password).then((user) =>{
                const userRef = doc(db, "users", auth.currentUser.uid);
                setDoc(userRef, {
                    name: name,
                    email: email,
                    circles: [],
                    pfp: ""
                });
            });
        } catch(e){
            alert("There was a error");
            console.log(e);
        }
    }
    return(
        <SafeAreaView>
            <Image cachePolicy="disk" style={globalstyle.logo} source={require("../../../assets/images/logotb.png")}/>
            <View>
                 <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={globalstyle.txtinput}
                    placeholderTextColor="black"
                />
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
            onPress={signup}
            ><Text style={globalstyle.buttontxt}>Sign up</Text></TouchableOpacity>

            <TouchableOpacity
                onPress={() => {nav.navigate("Login")}}
            ><Text style={globalstyle.buttontxt}>Have a account?</Text></TouchableOpacity>
        </SafeAreaView>
    )
}