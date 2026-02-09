import { Image } from "expo-image";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../../firebase";
export default function CircleSettings({id, circleData, memberData}){
    const [isOwner, setIsOwner] = useState(false);
    useState(() => {
        setIsOwner((memberData?.find(item => item.uid === auth.currentUser.uid).role == "Owner"));
    }, []);
    const changeName = async() => {

    }
    const removeUser = async() =>{

    }
    const deleteCircle = async() => {

    }
    const saveChanges = async() => {

    }


    if(isOwner){
        return(
            <View style={[style.container, {height: hp(42)}]}>
                <View style={style.content}>
                    <View style={style.header}>
                        <TouchableOpacity

                        >
                            {(circleData.cover) ? (
                                <Image style={style.cover} cachePolicy="disk" source={{uri: circleData.cover}}/> 
                            ): (
                            <Image style={style.cover} cachePolicy="disk" source={require("../../../assets/images/addimg.png")}/> 
                            )}
                         </TouchableOpacity>   
                        <Text style={style.title}>{circleData.name}</Text>     
                    </View>
                    <View>
                        <TouchableOpacity style={style.btn}>
                            <Text style={style.btntxt}>Change Name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn}>
                            <Text style={style.btntxt}>Remove User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn}>
                            <Text style={style.btntxt}>Delete Circle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn}>
                            <Text style={style.btntxt}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }else{
        return(
           <View style={[style.container, {height: hp(20)}]}>
                <View style={style.content}>
                    <View style={style.header}>
                        <TouchableOpacity

                        >
                            {(circleData.cover) ? (
                                <Image style={style.cover} cachePolicy="disk" source={{uri: circleData.cover}}/> 
                            ): (
                            <Image style={style.cover} cachePolicy="disk" source={require("../../../assets/images/logotb.png")}/> 
                            )}
                         </TouchableOpacity>   
                        <Text style={style.title}>{circleData.name}</Text>     
                    </View>
                    <View>
                        <TouchableOpacity style={style.btn}>
                            <Text style={style.btntxt}>Leave Circle</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    container: {
      backgroundColor: "white",
      borderRadius: 20
    }, content:{
        padding: wp(5),
    }, cover: {
        width: wp(15),
        height: hp(7),
        borderRadius: 1000
        
    }, header: {
        display: "flex",
        flexDirection: "row",
        gap: wp(2)

    },
    title: {
        fontSize: hp(4),
        fontWeight: "500",
        marginVertical: "auto"
    },
    btn: {
        width: wp(90),
        borderWidth: 1,
        marginTop: hp(2),
        padding: hp(1)
    }, btntxt: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: wp(5)
    }
    
});