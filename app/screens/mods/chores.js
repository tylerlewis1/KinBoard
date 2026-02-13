import { useLocalSearchParams } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebase";
import useAppColors from "../../background/Colors";
export default function Chores(){
    const { id, name, user, circleID, page} = useLocalSearchParams();
    const style = useStyles();
    const [data, setData] = useState();
    useEffect(() => {
        const modRef = doc(db, "circles", String(circleID), page, user, "chores", id);
        const unsubscribe = onSnapshot(modRef, (snapshot) => {
            setData(snapshot.data());
        }, (e) => {
            console.error("Listener failed: ", e);
        });
        return unsubscribe;
        
    }, [])
    return(
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                <View style={style.header}>
                    
                </View>
              
            </View>
        </SafeAreaView>
    )
}
function useStyles(){
    const colors = useAppColors();
    return StyleSheet.create({

    })
}