
import { userContext } from "@/app/background/Users";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { arrayUnion, doc, getDoc, writeBatch } from "firebase/firestore";
import { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../../firebase";
import style from "../../styles/editscreens/addCircle";
import QrCodeScanner from "./comps/qrcodescanner";
export default function JoinCircle(){
    const [code, setCode] = useState("");
    const user = useContext(userContext);
    const nav = useNavigation();
   
    const join = async() => {
        if(code == ""){
            alert("You must enter a code");
            return;
        }
        if(user.userData.circles.includes(Number(code))){
            alert("You are already in this circle");
            nav.goBack();
            return;
        }
        try{
            const circleRef = doc(db, "circles", code);
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userCollection = doc(db, "circles", code, auth.currentUser.uid, "init");
            const circleSnap = await getDoc(circleRef);
            if(!circleSnap.exists()){
                alert("No circle found");
                return;
            }
            let batch = writeBatch(db);
            batch.update(circleRef, {
                members: arrayUnion({
                    uid: auth.currentUser.uid,
                    pfp: user.userData.pfp,
                    name: user.userData.name
                })
            })
            batch.set(userCollection, {
                name: user.userData.name
            })
            batch.update(userRef, {
                circles: arrayUnion(Number(code))
            });
            await batch.commit();
            nav.navigate("Home");
            
        } catch(e){
            alert("Error joining circle");
            console.log(e);
        }
    }
   
    return(
        <SafeAreaView>
            <View style={style.top}>
                <TouchableOpacity
                    onPress={() => {
                        setCode("");
                        nav.goBack();
                    }}
                    style={{padding: 12}}
                >
                    <Ionicons name="arrow-back" size="24" />
                </TouchableOpacity>
                <Text style={style.txt}>Join Circle</Text>
            </View>
            <View>
                <QrCodeScanner setCode={setCode}/>
                <TextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder="Code"
                    style={[style.txtinput, {marginTop: "20%"}]}
                    placeholderTextColor="black"
                />


                <TouchableOpacity
                    style={[style.btn, {backgroundColor: "#2EC4B6"}]}
                    onPress={() => {join()}}
                ><Text style={style.btntxt}>Join Circle</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}