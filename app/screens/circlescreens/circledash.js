import { userContext } from "@/app/background/Users";
import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../../firebase";
import style from "../../styles/circle/circledash";
import Content from "./comps/content";
import NavBar from "./comps/navbar";
import SlideUpModal from "./comps/slidemodal";
export default function CircleDash(){
    const { id, name, cover } = useLocalSearchParams(); 
    const nav = useNavigation();
    const user = useContext(userContext);
    const [circleData, setCircleData] = useState();
    const [isOwner, setIsOwner] = useState(false);
    const [showAddModal, SetShowAddModal] = useState(false);
    const [selection, setSelection] = useState("home");
    const { width, height } = Dimensions.get("window");
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);
   
    useEffect(() => {
    if (!id) return;

    // 1. Ensure ID is a clean string (Expo Router sometimes returns arrays)
    const cleanId = Array.isArray(id) ? id[0] : id;
    const circleDocRef = doc(db, "circles", String(cleanId));

    const unsubscribe = onSnapshot(circleDocRef, async(snapshot) => {
        // 2. Check if .data is actually a function before calling it
        if (snapshot && typeof snapshot.data === 'function') {
            const data = await snapshot.data();
            if (data) {
                setCircleData(data);
            } else{
                return;
            }
            if(data.members.find(d => d.uid === auth.currentUser.uid).pfp != user.userData.pfp){
                const update = data.members;
                update.find(d => d.uid === auth.currentUser.uid).pfp = user.userData.pfp;
                await updateDoc(circleDocRef, {
                    members: update
                });
                console.log("pfp update");
            }
        } else {
            // 3. If it's not a function, it might already BE the data
            console.log("Snapshot doesn't have .data() function. Result:", snapshot);
            setCircleData(snapshot); 
        }
    }, (error) => {
        console.error("Firestore Listener Error:", error);
    });

    return () => unsubscribe();
}, [id]);


    return(
        <SafeAreaView>
            <View style={style.container}>
                
                <View style={style.header}>
                    <TouchableOpacity onPress={() => {nav.goBack()}}>
                        <Ionicons name="arrow-back" size={hp(2.5)} style={style.back} />
                    </TouchableOpacity>
                    {(circleData?.cover != "" && circleData?.cover != null)? (
                        <Image cachePolicy="disk" style={style.img} source={{uri: circleData?.cover}}/>   
                    ):(
                        <View style={{paddingBottom: hp(6)}}></View>
                    )}
                        
                    
                    <Text style={style.name}>{name}</Text>
                    <TouchableOpacity 
                        style={style.settings}
                    >      
                        <Entypo name="cog" size={hp(4.5)} />
                    </TouchableOpacity>
                </View>    
                <NavBar selection={selection} setSelection={setSelection} circleData={circleData}/>
                <Content selection={selection} circleData={circleData}/>
                {(selection == "home" || selection == auth.currentUser.uid)? (
                    <TouchableOpacity style={style.add} 
                        onPress={() => {SetShowAddModal(true)}}
                    >
                        <Text style={style.txt}>+</Text>
                    </TouchableOpacity>
                ):(
                    <></>
                )}
            </View>
                <SlideUpModal
                    visible={showAddModal}
                    onClose={() => SetShowAddModal(false)}
                    >
                    <View style={style.addcontent}>
                        <Text>add</Text>
                    </View>
                </SlideUpModal>

        </SafeAreaView>
    )
}