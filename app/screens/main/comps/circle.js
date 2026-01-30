import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function Circle({id, name, cover}) {
    console.log(cover);
    return(
        <TouchableOpacity style={style.btn}>
            <View style={{ height: hp(15)}}>
                {(cover == "") ? (
                    <Ionicons name="home" size={hp(10)} style={{textAlign: "center", marginTop: hp(3)}} />    
                ): (
                    <Image source={{uri: cover}} style={{width: hp(10), height: hp(10), display: "block",borderRadius: 100, margin: "auto"}}/>
                )}
            </View>
            <View>
                <Text style={style.txt}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    btn: {
        backgroundColor: "#f0eeee",
        width: wp(25),
        height: hp(20),
        borderRadius: 20,
        
   },
   txt: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: hp(1.5),
        fontSize: wp(3),
        width: wp(25),
   },

});