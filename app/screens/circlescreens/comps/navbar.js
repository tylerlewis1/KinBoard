import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "../../../../firebase";
import { userContext } from "../../../background/Users";
export default function NavBar({selection, setSelection, circleData}){
    const user = useContext(userContext);
    return(
        <ScrollView style={style.container} horizontal={true}>
            <TouchableOpacity
            style={(selection == "home")? (style.btnactive):(style.btn)}
            onPress={() => setSelection("home")}
            >
                <Ionicons name="home" size={hp(5)} style={{textAlign: "center", marginTop: hp(1.3)}}/>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={(selection == auth.currentUser.uid)? (style.btnactive):(style.btn)}
                onPress={() => setSelection(auth.currentUser.uid)}
            >
                {(user.userData?.pfp != "")? (
                    <Image source={{uri: user.userData.pfp}} style={style.pfp} />
                ):(
                    <Image source={require("../../../../assets/images/dpfp.png")} style={style.pfp}/>
                )}
            </TouchableOpacity>
            {/* Load other users */}
                
            
           
            <TouchableOpacity 
            style={(selection == "add")? (style.btnactive):(style.btn)}
            onPress={() => setSelection("add")}
            >
                <Text style={{textAlign: "center", fontSize: hp(5.9)}}>+</Text>
           </TouchableOpacity>
            
        </ScrollView>
    )

}

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#dfdede",
        width: wp(90),
        marginTop: hp(1),
        borderRadius: 10,
        left: wp(5),
        height: hp(10),
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)',
    }, 
    btn: {
        width: hp(8),
        height: hp(8),
        backgroundColor: "#ffffff",
        display: "block",
        margin: hp(1),
        borderRadius: 1000
    },
    btnactive: {
        width: hp(8),
        height: hp(8),
        backgroundColor: "#2EC4B6",
        display: "block",
        margin: hp(1),
        borderRadius: 1000
    },
    pfp: {
        width: hp(7),
        height: hp(7),
        borderRadius: 1000,
        margin: "auto"
    }

});