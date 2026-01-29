import { Ionicons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
export default function Circle({id, name}) {
    return(
        <TouchableOpacity style={style.btn}>
            <Ionicons name="home" size={hp(10)} style={{textAlign: "center", marginTop: hp(3)}} />
            <Text style={style.txt}>{name}</Text>
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
        
   },

});