import { userContext } from "@/app/background/Users";
import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { arrayUnion, collection, doc, onSnapshot, writeBatch } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
    const [memberData, setMemberData] = useState();
    const [isOwner, setIsOwner] = useState(false);
    const [showAddModal, SetShowAddModal] = useState(false);
    const [selection, setSelection] = useState("home");
    const { width, height } = Dimensions.get("window");
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
                    console.log(data)
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
    }, [id]);

    //getUsers
    useEffect(() => {
        if (!id) return;
        const cleanId = Array.isArray(id) ? id[0] : id;
        const membersRef = collection(db, "circles", String(cleanId), "members");
        const unsubscribeUsers = onSnapshot(membersRef, async(snapshot) => {
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
        try{
            const cleanId = Array.isArray(id) ? id[0] : id;
            const circleRef = doc(db, "circles", String(cleanId));
            const homeMods = doc(collection(circleRef, "home"), "modules");
            // const modRef = collection(homeMods, "")
            // need to do
            const batch = writeBatch(db);
            
            await batch.set(homeMods, {
                mods: arrayUnion({
                    id: 1242,
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
                <NavBar selection={selection} setSelection={setSelection} memberData={memberData}/>
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
                    <View style={style.addheader}>
                        <Text style={{textAlign: "center", top: hp(2), fontSize: hp(3), zIndex: 10000}}>Add Module</Text>
                    </View>
                    <ScrollView style={style.addcontent}
                        contentContainerStyle={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            padding: wp(5),
                            gap: wp(9), 
                            justifyContent: "center" ,
                        }}
                    >
                        <TouchableOpacity style={style.addbtn} onPress={() => {addMod("list")}}>
                            <View style={style.btnTop}>
                                <Ionicons size={hp(7)} style={style.icon} name="list"/>
                            </View>
                            <View style={style.btnBottom}>
                                <Text>List</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.addbtn} onPress={() => {addMod("events")}} >
                            <View style={style.btnTop}>
                                <Ionicons size={hp(7)} style={style.icon} name="calendar"/>
                            </View>
                            <View style={style.btnBottom}>
                                <Text>Events</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.addbtn} onPress={() => {addMod("chores")}}>
                            <View style={style.btnTop}>
                               <FontAwesome6 size={hp(7)} style={style.icon} name="broom"/>
                            </View>
                            <View style={style.btnBottom}>
                                <Text>Chores</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </SlideUpModal>

        </SafeAreaView>
    )
}