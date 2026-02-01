import { userContext } from "@/app/background/Users";
import { auth, db, storage } from "@/firebase";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { arrayRemove, collection, doc, updateDoc, writeBatch } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import global from "../../styles/main/global";

export default function Account() {
    const user = useContext(userContext);
    const nav = useNavigation();
    const [imageUri, setImageUri] = useState();
    const [iamgeUrl, setImageUrl] = useState();
    const pickImg = async() =>{
            console.log("test");
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log(status);
            if(status != "granted"){
                alert("You must give photo permition to add images");
                return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: .1,
            })
            saveImg(result.assets[0].uri);
            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
        }
        const saveImg = async(uri) => {
            try{
                let res = await fetch(uri);
                const blob = await res.blob();
                const storageRef = ref(storage, `images/${auth.currentUser.uid}/pfp.jpg`);
                await uploadBytes(storageRef, blob);
                const url = await getDownloadURL(storageRef);
                setImageUrl(url);
                const userDoc = doc(db, "users", auth.currentUser.uid);
                await updateDoc(userDoc, {pfp: url});
            }catch(e){
                console.log(e);
                alert("There was a error saving you image");
            }
        }

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
        const batch = writeBatch(db);
        const userdoc = doc(db, "users", auth.currentUser.uid);
        //images, circles
        try{
            const userMap = {
                name: user.userData.name,
                pfp: user.userData.pfp,
                uid: auth.currentUser.uid
            }
            user.userData.circles.map( async(circleID) => {
                const circleRef = doc(db, "circles", String(circleID));
                const circleCollection = doc(collection(circleRef, String(auth.currentUser.uid)));
                batch.update(circleRef, {
                    members: arrayRemove(userMap)
                })
                // const snapshot = await getDocs(circleCollection);
                // snapshot.forEach((subDoc) => {
                //     batch.delete(subDoc.ref);
                // });
            });
            batch.delete(userdoc);
            await batch.commit();
            //del images
            if(user.userData.pfp != ""){
                const fileRef = ref(storage, `images/${auth.currentUser.uid}/pfp.jpg`);
                await deleteObject(fileRef);
            }
            auth.currentUser.delete();
            alert("Your account has been deleated!");
        } catch(e){
            console.log(e);
        }
    }


    return(
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => {nav.goBack()}}
            >
                <Ionicons name="arrow-back" size="24" style={global.back} />
            </TouchableOpacity>
            <View style={global.container}>
            <TouchableOpacity
                onPress={() => {pickImg()}}
            >
                {(user.userData.pfp != "")? (
                    <Image style={global.pfp} source={{uri: user.userData.pfp}}/>
                ): (
                    <Image style={global.pfp} source={require("../../../assets/images/dpfp.png")}/>
                )}
            </TouchableOpacity>
                
                
                <Text style={global.name}>{user.userData.name}</Text>
                
                <TouchableOpacity 
                onPress={() => {resetpass()}}
                style={[global.btn, {backgroundColor: "#2EC4B6"}]}>
                    <Text style={global.btntxt}>Reset password</Text>
                </TouchableOpacity>
                

                <TouchableOpacity 
                onPress={() => {auth.signOut()}}
                style={[global.btn, {backgroundColor: "#FF6F61"}]}>
                    <Text style={global.btntxt}>Sign out</Text>
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