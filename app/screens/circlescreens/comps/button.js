import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function Btn({data}){
    console.log(data.id)
    const getIcon = () => {
        if(data.type.startsWith("chores")){
            return(
                <FontAwesome6 size={hp(7)} style={style.icon} name="broom"/>
            )
        } else if(data.type.startsWith("list")){
            return(
                <Ionicons size={hp(7)} style={style.icon} name="list"/>
            )
        }else if(data.type.startsWith("events")){
            return(
                <Ionicons size={hp(7)} style={style.icon} name="calendar"/>
            )
        }else if(data.type.startsWith("contacts")){
            return(
                <FontAwesome6 size={hp(7)} style={style.icon} name="book"/>
            )
        }else if(data.type.startsWith("savings goal")){
            return(
                <FontAwesome6 size={hp(7)} style={style.icon} name="jar"/>
            )
        }
        return(
            <Ionicons size={hp(7)} style={style.icon} name="idk"/>
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
                <Text style={{textAlign: "center", fontWeight: "700", top: hp(1)}}>{(data.name)? (data.name) : ("No name")}</Text>
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
        borderRadius: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
    },
    top: {
        height: hp(11),
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.1)'
    },
    icon: {
        textAlign: 'center',
        margin: "auto",
        color: "#575555"
    }

});