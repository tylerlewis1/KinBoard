import { userContext } from "@/app/background/Users";
import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { arrayUnion, collection, doc, onSnapshot, updateDoc, writeBatch } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../../firebase";
import useStyles from "../../styles/circle/circledash";
import CircleSettings from "../editscreens/circleSettings";
import Btn from "./comps/button";
import Content from "./comps/content";
import NavBar from "./comps/navbar";
import SlideUpModal from "./comps/slidemodal";
export default function CircleDash(){
    const { id, name, cover } = useLocalSearchParams(); 
    const style = useStyles();
    const nav = useNavigation();
    const [circleData, setCircleData] = useState();
    const [settingsModal, setSettingsModal] = useState();
    const [memberData, setMemberData] = useState();
    const [showAddModal, SetShowAddModal] = useState(false);
    const [selection, setSelection] = useState("home");
    const { width, height } = Dimensions.get("window");
    const user = useContext(userContext);
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);
   
    //Get circle data
    useEffect(() => {
        if (!id) return;
        const cleanId = Array.isArray(id) ? id[0] : id;
        const circleDocRef = doc(db, "circles", String(cleanId));

        const unsubscribe = onSnapshot(circleDocRef, async(snapshot) => {
            if (snapshot && typeof snapshot.data === 'function') {
                const data = await snapshot.data();
                if (data) {
                    setCircleData(data);
                } else{
                    return;
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
    }, [circleData, id]);

    //getUsers
    useEffect(() => {
        if (!id) return;
        const cleanId = Array.isArray(id) ? id[0] : id;
        const membersRef = collection(db, "circles", String(cleanId), "members");
        const unsubscribeUsers = onSnapshot(membersRef, async(snapshot) => {
                //update pfp if needed
                if(((snapshot.docs.find((doc) => doc.id == auth.currentUser.uid).data().pfp) != user.userData?.pfp)){
                    try{
                        const memberDoc = doc(membersRef, auth.currentUser.uid);
                        await updateDoc(memberDoc, {
                            pfp: user.userData.pfp
                        });
                    }catch(e){
                        console.log(e);
                    }
                }
                
                const membersList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMemberData(membersList);
        }, (error) => {
            console.error("Firestore Listener Error:", error);
        });

        return () => unsubscribeUsers();
    }, [id]);

    const addMod = async(type) => {
        if(selection == "home"){
            try{
                const cleanId = Array.isArray(id) ? id[0] : id;
                const circleRef = doc(db, "circles", String(cleanId));
                const homeMods = doc(collection(circleRef, "home"), "modules");
                const newDocRef = doc(collection(homeMods, type));
                const batch = writeBatch(db);
                batch.set(newDocRef, {
                    data: [],
                    type: type,
                    circleID: circleData.id,
                    id: newDocRef.id,
                    name: type
                })
                batch.set(homeMods, {
                    mods: arrayUnion({
                        id: newDocRef.id,
                        name: type,
                        type: type
                    })
                }, {merge: true})
                batch.commit();
                SetShowAddModal(false);
            }catch(e){
                console.log(e);
                alert("There was a error adding you module");
                return;
            }
        } else {
            try{
                const cleanId = Array.isArray(id) ? id[0] : id;
                const circleRef = doc(db, "circles", String(cleanId));
                const userMods = doc(collection(circleRef, "members"), auth.currentUser.uid);
                const newDocRef = doc(collection(userMods, type));
                const batch = writeBatch(db);
                batch.set(newDocRef, {
                    data: [],
                    type: type,
                    circleID: circleData.id,
                    id: newDocRef.id,
                    name: type
                })
                batch.set(userMods, {
                    mods: arrayUnion({
                        id: newDocRef.id,
                        name: type,
                        type: type
                    })
                }, {merge: true})
                batch.commit();
                SetShowAddModal(false);
            }catch(e){
                console.log(e);
                alert("There was a error adding you module");
                return;
            }
        }
    }


    return(
        <SafeAreaView style={style.container}> 
            <View>
                
                <View style={style.header}>
                    <TouchableOpacity onPress={() => {nav.goBack()}}>
                        <Ionicons color={style.iconc} name="arrow-back" size={hp(2.5)} style={style.back}  />
                    </TouchableOpacity>
                    {(circleData?.cover != "" && circleData?.cover != null)? (
                        <Image cachePolicy="disk" style={style.img} source={{uri: circleData?.cover}}/>   
                    ):(
                        <View style={{paddingBottom: hp(6)}}></View>
                    )}
                        
                    
                    <Text style={style.name}>{name}</Text>
                    <TouchableOpacity 
                        style={style.settings}
                        onPress={() => setSettingsModal(true)}
                    >      
                        <Entypo color={style.iconc} name="cog" size={hp(4.5)} />
                    </TouchableOpacity>
                </View>    
                <NavBar colors={style.colors} selection={selection} setSelection={setSelection} memberData={memberData}/>
                <Content selection={selection} circleData={circleData} memberData={memberData}/>
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
                    <View style={style.addheader}>
                        <Text style={[{textAlign: "center", top: hp(3), fontSize: hp(3), zIndex: 10000}, style.modaltxt]}>Add Module</Text>
                    </View>
                    <ScrollView style={style.addcontent}
                        contentContainerStyle={{
                            gap: wp(4), 
                            justifyContent: "center",
                            paddingBottom: hp(2)
                        }}
                    >
                        <TouchableOpacity onPress={() => {addMod("list")}}>
                            <Btn colors={style.colors} data={{type: "list!", name: "List"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {addMod("chores")}}>
                            <Btn colors={style.colors} data={{type: "chores!", name: "Chores"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {addMod("contacts")}}>
                            <Btn colors={style.colors} data={{type: "contacts!", name: "Contacts"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {addMod("events")}}>
                            <Btn colors={style.colors} data={{type: "events!", name: "Events"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {addMod("chat")}}>
                            <Btn colors={style.colors} data={{type: "chat!", name: "Chat"}}/>
                        </TouchableOpacity>
                    </ScrollView>
                </SlideUpModal>
                <SlideUpModal
                    visible={settingsModal}
                    onClose={() => setSettingsModal(false)}
                >
                    <CircleSettings colors={style.colors} id={id} circleData={circleData} memberData={memberData}/>
                </SlideUpModal>
        </SafeAreaView>
    )
}