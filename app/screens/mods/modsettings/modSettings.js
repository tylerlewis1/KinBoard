import { db } from "@/firebase";
import { useNavigation } from "expo-router";
import { arrayRemove, getDoc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Dimensions, Text, TextInput, TouchableOpacity, View } from "react-native";
import useStyle from "./modSettigs.styles";
export default function CompSettings({id, colors, modRef, data, pointerRef}){
    const style = useStyle(colors);
    const nav = useNavigation();
    const [name, setName] = useState();
    const { width, height } = Dimensions.get("window");
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);

    const updateName = async() => {
        if (!name) return(alert("No Name Entered"));
        try{
            const batch = writeBatch(db);
            const snap = await getDoc(pointerRef);
            const mods = snap.data().mods || [];
            const updatedMods = mods.map(m =>
                m.id === id ? { ...m, name: name } : m
            );
            batch.update(modRef, {
                name: name
            });
            batch.update(pointerRef, {
                mods: updatedMods
            })
            batch.commit();
            
        }catch(e){
            console.log(e);
            alert("Error changing name")
        }
    }
    const remove = async() => {
        try{
            const batch = writeBatch(db);
            batch.update(pointerRef, {
                mods: arrayRemove({
                    id: id,
                    name: data.name,
                    type: data.type,
                })
            })
            batch.delete(modRef);
            batch.commit();
            nav.goBack();
        }catch(e){
            console.log(e);
            alert("There was a error removing your circle")
        }
    }
   
    if(!data){
        <ActivityIndicator/>
    }
        return(
            <View style={[style.container, {minHeight: hp(25)}]}
               
            >
                <View style={style.content}
                
                >
                    <View style={style.header}>
     
                        <View style={{display: "flex", flexDirection: "column"}}>
                            <TextInput style={style.title} onChangeText={setName} placeholder={data.name} returnKeyLabel="done" returnKeyType="done"/>
                        </View>   
                    </View>
                    <View>
                        <TouchableOpacity style={style.btn} onPress={() => {updateName()}}>
                            <Text style={style.btntxt}>Change Name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btn} onPress={() => {remove()}}>
                            <Text style={style.btntxt}>Remove Module</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
       
}
