import { Ionicons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function NavBar({data}){
    const getIcon = () => {
        return(
            <Ionicons size={hp(9)} style={style.icon} name="idk"/>
        )
    }
    return(
          <TouchableOpacity style={style.button}>
            <View style={style.top}>
                {
                    getIcon()
                }                
            </View>
            <View style={style.bottom}>
                <Text style={{textAlign: "center"}}>{data.id}</Text>
            </View>
        </TouchableOpacity>
    )

}

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    button: {
        backgroundColor: "#ffffff",
        width: wp(25),
        height: hp(15),
        borderRadius: 10
    },
    top: {

    },
    icon: {
        textAlign: 'center'
    }

});