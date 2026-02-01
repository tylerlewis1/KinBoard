import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../../firebase";
import Announcments from "./comps/announcments";
import Button from "./comps/button";
export default function Home({circleData}) {
    const [collectionData, setCollectionData] = useState(null);
    useEffect(() => {
    // 1. Guard clause: don't run if circleData hasn't loaded yet
    if (!circleData?.id) return;

    const homeRef = collection(db, "circles", String(circleData.id), "home");

    const unsubscribe = onSnapshot(homeRef, (snapshot) => {
            // 2. Map docs synchronously (no async/await needed)
            const temp = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()       
            }));

            setCollectionData(temp);
        }, (e) => {
            console.error("Listener failed: ", e);
        });

        // 3. Return the unsubscribe function directly for cleanup
        return unsubscribe;
      
    }, [circleData?.id]);


    if(!collectionData){
        return(
            <ActivityIndicator size="large" style={{top: hp(30)}}/>
        )
    }
    return(
        
        <ScrollView style={style.continer}>
            <View style={style.top}>
                <Text style={style.header}>{circleData?.name}</Text>
            </View>
            <View style={style.content}>
                <Announcments circleData={circleData} announcments={collectionData?.find(d => d.id === "announcments").Announcments}/>
                <View style={style.btns}>
                    {
                        collectionData.map((data) => {
                            if(data.id == "announcments"){
                                return;
                            }
                            //render buttons 
                            return(
                                <Button data={data} key={data.id}/>
                            )
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
        padding: hp(1),
        display: "flex",
        flexDirection: "row",
        gap: wp(5),
        flexWrap: "wrap"

   }
});