import { Image } from 'expo-image';
import { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
export default function Announcments({circleData, announcments}) {
    const [data, setData] = useState(null);
    if(!announcments){
        return(
            <ActivityIndicator/>
        )
    }
    return(
        <View style={style.continer}>
            <View>
                <View style={style.header}>
                    {(data?.Announcments[data?.Announcments.length -1].pfp) ? (
                        <Image style={style.img} source={{uri: announcments[announcments.length -1].pfp}}/>
                    ):(
                        <Image cachePolicy="disk" style={style.img} source={require("../../../../assets/images/logotb.png")}/>
                    )}
                    <Text style={style.name}>{announcments[announcments.length -1].who}</Text>
                </View>
                <View style={style.msg}>
                    <Text style={style.msgtxt}>{announcments[announcments.length -1].msg}</Text>
                </View>
                <Text style={{paddingVertical: hp(1)}}>{(announcments[announcments.length - 1].date.toDate()).toLocaleString()}</Text>
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