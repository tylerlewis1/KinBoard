import useAppColors from "@/app/background/Colors";
import { router } from "expo-router";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../../firebase";
import Announcments from "./comps/announcments/announcments";
import Btn from "./comps/button";
export default function Home({circleData}) {
    const colors = useAppColors();
    const [collectionData, setCollectionData] = useState(null);
    const [mods, setMods] = useState(null);
    //get announcments
    useEffect(() => {
    if (!circleData?.id) return;
    const homeRef = doc(collection(db, "circles", String(circleData.id), "home"), "announcements");
    const unsubscribe = onSnapshot(homeRef, (snapshot) => {
            setCollectionData(snapshot.data());
        }, (e) => {
            console.error("Listener failed: ", e);
        });
        return unsubscribe;
      
    }, [circleData?.id]);
    useEffect(() => {
    if (!circleData?.id) return;
        const homeRef = doc(collection(db, "circles", String(circleData.id), "home"), "announcements");
        const unsubscribe = onSnapshot(homeRef, (snapshot) => {
                setCollectionData(snapshot.data());
            }, (e) => {
                console.error("Listener failed: ", e);
            });
            return unsubscribe;
        
    }, [circleData?.id]);
    useEffect(() => {
    if (!circleData?.id) return;
        const homeRef = doc(collection(db, "circles", String(circleData.id), "home"), "modules");
        const unsubscribe = onSnapshot(homeRef, (snapshot) => {
                setMods(snapshot.data().mods)
            }, (e) => {
                console.error("Listener failed: ", e);
            });
            return unsubscribe;
        
    }, [circleData?.id]);



    if(!collectionData){
        return(
            <ActivityIndicator size="large" style={{top: hp(30)}}/>
        )
    }
    return(
        <ScrollView style={style.continer}>
            {/* <View style={style.top}>
                <Text style={style.header}>{circleData?.name}</Text>
            </View> */}
            <View style={style.content}>
                <Announcments circleData={circleData} colors={colors} announcments={collectionData.msgs}/>
                <View style={style.btns}>
                   {
                    mods?.map((mods) => {
                        if(mods.type == "list"){
                            return(   
                                <TouchableOpacity key={mods.id}
                                    onPress={() =>
                                        router.navigate({
                                            pathname: "/screens/mods/lists/list", 
                                            params: {id: mods.id, name: mods.name, circleID: circleData.id, user: "modules", page: "home"}
                                        })
                                    }
                                >
                                    <Btn colors={colors} data={mods}/>
                                </TouchableOpacity>
                            );
                        }
                         if(mods.type == "chores"){
                            return(   
                                <TouchableOpacity key={mods.id}
                                    onPress={() =>
                                        router.navigate({
                                            pathname: "/screens/mods/chores/chores", 
                                            params: {id: mods.id, name: mods.name, circleID: circleData.id, user: "modules", page: "home"}
                                        })
                                    }
                                >
                                    <Btn colors={colors} data={mods}/>
                                    
                                </TouchableOpacity>
                            );
                        }
                         if(mods.type == "contacts"){
                            return(   
                                <TouchableOpacity key={mods.id}
                                    onPress={() =>
                                        router.navigate({
                                            pathname: "/screens/mods/contacts/contacts", 
                                            params: {id: mods.id, name: mods.name, circleID: circleData.id, user: "modules", page: "home"}
                                        })
                                    }
                                >
                                    <Btn colors={colors} data={mods}/>
                                </TouchableOpacity>
                            );
                        }
                         if(mods.type == "savings goal"){
                            return(   
                                <TouchableOpacity key={mods.id}>
                                    <Btn colors={colors} data={mods}/>
                                </TouchableOpacity>
                            );
                        }
                         if(mods.type == "events"){
                            return(   
                                <TouchableOpacity key={mods.id}
                                    onPress={() =>
                                        router.navigate({
                                            pathname: "/screens/mods/events/events", 
                                            params: {id: mods.id, name: mods.name, circleID: circleData.id, user: "modules", page: "home"}
                                        })
                                    }
                                >
                                    <Btn colors={colors} data={mods}/>
                                </TouchableOpacity>
                            );
                        }
                    })
                   }
                </View>
            </View>
        </ScrollView>
    );
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    continer: {
        paddingBottom: hp(2)
    },
    top: {
        height: hp(10),
        padding: hp(1)
    },
    header: {
        fontSize: hp(6),
        fontWeight: "200"
    },
    announcments: {
        
    },
    btns: {
        paddingTop: hp(3),
        display: "flex",
        flexDirection: "row",
        gap: wp(5),
        flexWrap: "wrap"

   }
});