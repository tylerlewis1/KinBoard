import { userContext } from "@/app/background/Users";
import { auth, db } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, writeBatch } from "firebase/firestore";
import { useContext } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import global from "../../styles/main/global";
export default function Account() {
    const user = useContext(userContext);
    const resetpass = async() =>{
        try{
            await sendPasswordResetEmail(auth, user.userData.email).then(() =>{
                alert("A email with instructions was sent (Check spam)");
            })
        }catch(e){
            console.log("error");
            alert("There was a issue resetting your password");
        }
    }
    const confirm = () => {
         Alert.alert('Confirm', 'Are you sure you want to deleate your account?', [
        {
            text: 'No',
            onPress: () => {return},
            style: 'cancel',
        },
        {text: 'Yes', onPress: () => {delacc()}},
        ]);
    }
    const delacc = async() => {
        const userdoc = doc(db, "users", auth.currentUser.uid);
        try{
            const batch = writeBatch(db);
            batch.delete(userdoc);
            await batch.commit();
            auth.currentUser.delete();
            alert("Your account has been deleated!");
        } catch(e){
            console.log(e);
        }
    }


    return(
        <SafeAreaView>
            <View style={global.container}>

                <Image style={global.pfp} source={require("../../../assets/images/dpfp.png")}/>
                <Text style={global.name}>{user.userData.name}</Text>
                
                <TouchableOpacity 
                onPress={() => {resetpass()}}
                style={[global.btn, {backgroundColor: "#2EC4B6"}]}>
                    <Text style={global.btntxt}>Reset password</Text>
                </TouchableOpacity>
                

                <TouchableOpacity 
                onPress={() => {auth.signOut()}}
                style={[global.btn, {backgroundColor: "#FF6F61"}]}>
                    <Text style={global.btntxt}>Signout</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={() => {confirm()}}
                style={[global.btn, {backgroundColor: "#FF6F61"}]}>
                    <Text style={global.btntxt}>Deleat Account</Text>
                </TouchableOpacity>

            </View>
           
        </SafeAreaView>
    );
}