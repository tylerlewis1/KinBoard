import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { db } from "../../../../firebase";
export default function Announcments({circleData}) {
    const [data, setData] = useState(null);
    useEffect(() => {
        // 1. Add a guard clause: Don't fetch if circleData isn't ready yet
        if (!circleData?.id) return;

        const getMsg = async() =>{
            try {
                const announcementDocRef = doc(db, "circles", String(circleData.id), "home", "announcments");
                const homeSnap = await getDoc(announcementDocRef);
                
                if (homeSnap.exists()) {
                    const fetchedData = homeSnap.data();
                    setData(fetchedData);
                }
            } catch(e) {
                console.log("Fetch error:", e);
            }
        }
        getMsg();
    }, [circleData?.id]);   
    if(!data){
        return(
            <ActivityIndicator/>
        )
    }
    return(
        <View style={style.continer}>
            <View>
                <View style={style.header}>
                    {(data?.Announcments[data?.Announcments.length -1].pfp) ? (
                        <Image style={style.img} source={{uri: data?.Announcments[data?.Announcments.length -1].pfp}}/>
                    ):(
                        <Image style={style.img} source={require("../../../../assets/images/logotb.png")}/>
                    )}
                    <Text style={style.name}>{data?.Announcments[data?.Announcments.length -1].who}</Text>
                </View>
                <View style={style.msg}>
                    <Text style={style.msgtxt}>{data?.Announcments[data?.Announcments.length -1].msg}</Text>
                </View>
            </View>
        </View>
    );
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    continer: {
        backgroundColor: "#ffffff",
        width: wp(87),
        margin: "auto",
        padding: hp(2),
        borderRadius: 10
    },
    header: {
        paddingBottom: hp(2),
        display: "flex",
        flexDirection: "row",
        gap: wp(2)
    },
    msg: {
       width: wp(80),
       margin: "auto",
    },
    msgtxt: {
        fontSize: hp(2),
        fontWeight: "400"
    },
    img: {
        width: hp(4),
        height: hp(4),
        borderRadius: 1000
    },
    name: {
        marginTop: hp(1),
        fontWeight: "bold"
    }
});