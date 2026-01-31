
import { userContext } from "@/app/background/Users";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "expo-router";
import { arrayUnion, doc, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db, storage } from "../../../firebase";
import style from "../../styles/editscreens/addCircle";
export default function AddCircle(){
    const [name, setName] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [iamgeUrl, setImageUrl] = useState(null);
    const [id, setId] = useState(null);
    const user = useContext(userContext);
    const nav = useNavigation();
    useEffect(() => {
        setId(Math.floor(Math.random() * (100000000 - 0 + 1)) + 0);
    }, [])
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
            quality: .2,
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
            const storageRef = ref(storage, `images/${auth.currentUser.uid}/${id}.jpg`);
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
            console.log(url);

        }catch(e){
            console.log(e);
            alert("There was a error saving you image");
        }
    }
    const createCircle = async() => {
        try{
            const circleDoc = doc(db, "circles", String(id));
            const userDoc = doc(db, "users", auth.currentUser.uid);
            const batch = writeBatch(db);
            batch.set(circleDoc, {
                name: name,
                cover: iamgeUrl,
                owner: auth.currentUser.uid,
                members: [{
                    name: user.userData.name,
                    uid: auth.currentUser.uid,
                    pfp: user.userData.pfp
                }],
                created: new Date(),
                id: id
            });
            batch.update(userDoc, {
                circles: arrayUnion(id)
            });
            await batch.commit();
            nav.goBack();

        }catch(e){
            alert("There was an error creating you circle");
            console.log(e);
        }
    }
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
                    onPress={() => {pickImg()}}
                >
                {(iamgeUrl == null) ? (
                    <Image style={style.img} source={require("../../../assets/images/addimg.png")}/>
                ): (
                    <Image style={style.img} source={{uri: iamgeUrl}}/>
                )}
                </TouchableOpacity>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={style.txtinput}
                    placeholderTextColor="black"
                />


                <TouchableOpacity
                    style={[style.btn, {backgroundColor: "#2EC4B6"}]}
                    onPress={() => {createCircle()}}
                ><Text style={style.btntxt}>Create Circle</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}