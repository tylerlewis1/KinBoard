import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function Circle({id, name, cover}) {
    const nav = useNavigation();
    return(
        <TouchableOpacity 
            style={style.btn}
            onPress={() => {
               router.navigate({
                    pathname: "/screens/circlescreens/circledash", 
                    params: { id, name, cover }
                });
            }}
        >
            <View style={{ height: hp(13)}}>
                {(cover == "") ? (
                    <Ionicons name="home" size={hp(10)} style={{textAlign: "center", marginTop: hp(3)}} />    
                ): (
                    <Image source={{uri: cover}} style={{width: hp(9), height: hp(9), display: "block",borderRadius: 100, margin: "auto"}}/>
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