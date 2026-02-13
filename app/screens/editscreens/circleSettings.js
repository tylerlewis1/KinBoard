import { db, functions } from '@/firebase';
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { doc, updateDoc } from 'firebase/firestore';
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { auth } from "../../../firebase";
export default function CircleSettings({id, circleData, memberData, colors}){
    const [isOwner, setIsOwner] = useState(false);
    const [name, setName] = useState("");
    const nav = useNavigation();
    useState(() => {
        setIsOwner((memberData?.find(item => item.uid === auth.currentUser.uid).role == "Owner"));
    }, []); 
    const changeName = async() => {
        if(name == "") return(alert("You must enter a name"));
        try{
            const circelRef = doc(db, "circles", circleData.id);
            await updateDoc(circelRef, {
                name: name
            });
            alert("Done, You may have to reload the app to see the changes");
        }catch(e){
            console.log(e);
            alert("There was a error changing the name")
        }
    }
    const removeUser = async() =>{

    }
    const deleteCircle = async () => {
        try {
            const deleteFn = httpsCallable(functions, 'recursiveDeleteCollection');
            
            // Pass just the ID as an object
            nav.goBack();
            const response = await deleteFn({ id: id, uid: auth.currentUser.uid }); 
            
            console.log("Deleted:", response.data);
            
        } catch (e) {
            console.error(e);
            alert("Error deleting circle.");
        }
    }   

    const leavecircle = async() => {
        try{    
            
        }catch(e){
            console.log(e);
            alert("Error leaving circle");
        }
    }
    const { width, height } = Dimensions.get("window");
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);
    const style = StyleSheet.create({
        container: {
        backgroundColor: colors.background,
        borderRadius: 20
        }, content:{
            padding: wp(5),
        }, cover: {
            width: hp(7),
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
            marginVertical: "auto",
            color: colors.txt,
            width: wp(70)
        },
        btn: {
            width: wp(90),
            borderWidth: 1,
            marginTop: hp(2),
            padding: hp(1),
            backgroundColor: colors.compbgl,
            borderColor: colors.compbg
        }, btntxt: {
            textAlign: "center",
            fontWeight: "700",
            fontSize: hp(3),
            color: colors.txt
        },date: {
            color: colors.txt
        }
        
    });
    if(!circleData || ! memberData){
        <ActivityIndicator/>
    }
    if(isOwner){
        return(
            <View style={[style.container, {minHeight: hp(35)}]}>
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
                        <View style={{display: "flex", flexDirection: "column"}}>
                        <TextInput style={style.title} placeholder={circleData.name} placeholderTextColor={colors.txt} onChangeText={setName}/>
                        <Text style={style.date}>Created {circleData.created?.toDate?.()?.toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}</Text> 
                        </View>   
                    </View>
                    <View>
                        <TouchableOpacity style={style.btn} onPress={() => {changeName()}}>
                            <Text style={style.btntxt}>Change Name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn}>
                            <Text style={style.btntxt}>Remove User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn} onPress={() => {deleteCircle()}}>
                            <Text style={style.btntxt}>Delete Circle</Text>
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
                        <View style={{display: "flex", flexDirection: "column"}}>
                        <Text style={style.title}>{circleData.name}</Text>
                        <Text style={style.date}>Created {circleData.created?.toDate?.()?.toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}</Text> 
                        </View>        
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
