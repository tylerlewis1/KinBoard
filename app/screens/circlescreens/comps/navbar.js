import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useContext } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "../../../../firebase";
import { userContext } from "../../../background/Users";
export default function NavBar({selection, setSelection, memberData, colors}){
    const user = useContext(userContext);
    const style = useStyle(colors);
    return(
        <ScrollView style={style.container} horizontal={true}>
            <TouchableOpacity
            style={(selection == "home")? (style.btnactive):(style.btn)}
            onPress={() => setSelection("home")}
            >
                <Ionicons color={style.txt} name="home" size={hp(5)} style={{textAlign: "center", marginTop: hp(1.3)}}/>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={(selection == auth.currentUser.uid)? (style.btnactive):(style.btn)}
                onPress={() => setSelection(auth.currentUser.uid)}
            >
                {(user.userData?.pfp != "")? (
                    <Image cachePolicy="disk" source={{uri: user.userData?.pfp}} style={style.pfp} />
                ):(
                    <Image source={require("../../../../assets/images/dpfp.png")} style={style.pfp}/>
                )}
            </TouchableOpacity>
            {/* Load other users */}
            {
                memberData?.map((member) => {
                    if(auth.currentUser.uid != member.uid){
                        return(
                            <TouchableOpacity
                                key={member.uid}
                                style={(selection == member.uid)? (style.btnactive):(style.btn)}
                                onPress={() => setSelection(member.uid)}
                            >
                                {(member.pfp != "")? (
                                    <Image source={{uri: member.pfp}} style={style.pfp} />
                                ):(
                                    <Image source={require("../../../../assets/images/dpfp.png")} style={style.pfp}/>
                                )}
                            </TouchableOpacity>
                        )
                    }
                })
            }
            
           
            <TouchableOpacity 
            style={(selection == "add")? (style.btnactive):(style.btn)}
            onPress={() => setSelection("add")}
            >
                <Text style={[{textAlign: "center", fontSize: hp(5.9)}, style.plus]}>+</Text>
           </TouchableOpacity>
            
        </ScrollView>
    )

}

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
function useStyle(colors) {
return StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: colors.compbg,
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
        backgroundColor: colors.compbgd,
        display: "block",
        margin: hp(1),
        borderRadius: 1000
    },
    btnactive: {
        width: hp(8),
        height: hp(8),
        backgroundColor: colors.accent,
        display: "block",
        margin: hp(1),
        borderRadius: 1000
    },
    pfp: {
        width: hp(7),
        height: hp(7),
        borderRadius: 1000,
        margin: "auto"
    },
    plus: {
        color: colors.txt
    },
    txt: colors.txt

});
}