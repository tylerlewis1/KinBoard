import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../../../firebase";
export default function Announcments({circleData}) {
    
    useEffect(() => {
        const getMsg = async() =>{
            try{
                const announcementDocRef = doc(db, "circles", String(circleData.id), "home", "announcments");
                const homeSnap = await getDoc(announcementDocRef);
                
                console.log(homeSnap.data());
            }catch(e){
                console.log(e);
            }
        }
        getMsg();
    }, [])
    return(
        <ScrollView style={style.continer}>
            <View style={style.header}>
                
            </View>
            <View style={style.msg}>
                
            </View>
        </ScrollView>
    );
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    continer: {
        backgroundColor: "#ffffff",
        width: wp(87),
        height: hp(5),
        margin: "auto",
        borderRadius: 10
    },
    header: {
        
    },
    msg: {
       
    },
    
});