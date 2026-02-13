import { db } from "@/firebase";
import { useNavigation } from "expo-router";
import { arrayRemove, getDoc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
export default function CompSettings({id, colors, modRef, data, pointerRef}){
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
            width: wp(80)
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
