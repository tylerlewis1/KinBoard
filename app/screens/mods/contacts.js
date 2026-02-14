import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebase";
import useAppColors from "../../background/Colors";
import ModSettings from "../../screens/editscreens/modSettings";
import SlideUpModal from "../circlescreens/comps/slidemodal";
 const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
export default function Contacts(){
    const { id, user, circleID, page} = useLocalSearchParams();
    
    const [data, setData] = useState(null);
    const [settingsModal, setSettingsModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const style = useStyles();
    const nav = useNavigation();
   
    const modRef = doc(db, "circles", String(circleID), page, user, "contacts", id);
    const pointerRef = doc(db, "circles", String(circleID), page, user);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(modRef, (snapshot) => {
            setData(snapshot.data());
        }, (e) => {
            console.error("Listener failed: ", e);
        });
        return unsubscribe;
        
    }, []);
    const add = async() => {
        try{
            setAddItem("");
            await updateDoc(modRef, {
                data: arrayUnion({
                    name: addItem,
                    checked: false,
                    id: Math.random(),
                    url: ""
                })
            })
            
        }catch(e){
            console.log(e);
            alert("error");
        }
    }
    const remove = async(item) => {
         try{
             await updateDoc(modRef, {
                data: arrayRemove(item.item)
            })
        }catch(e){
            console.log(e);
            alert("error");
        }
    }
    const check = async(item) => {
        try{
            data.data.find((datai) => datai.id == item.item.id).checked = !(data.data.find((datai) => datai.id == item.item.id).checked );
            await updateDoc(modRef, {
                data: data.data
            });
        }catch(e){
            console.log(e);
            alert("error");
        }
    }
    const rename = async() =>{

    }

    if(!data){
        return(<ActivityIndicator style={style.loading}/>)
    }
    
    const renderRightActions = (progress, dragX, item) => {
        return (
            <TouchableOpacity 
                style={style.delbtn} 
                onPress={() => {
                    remove(item);
                }}
            >
                <Ionicons style={{margin: "auto"}}size={hp(2.5)} color="white" name="trash"/>
            </TouchableOpacity>
        );
    };

    const Item = (item) => {
        return(
            <Swipeable 
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
            >
                <Pressable style={style.listitem} key={item.id} onPress={() => check(item)} >
                
                </Pressable>
            </Swipeable>
        )
    }

    return(
        <SafeAreaView style={style.container}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => {nav.goBack()}}>
                    <Ionicons color={style.txtc} size={wp(6)} name="arrow-back" style={style.back} />
                </TouchableOpacity>
                <Text style={style.title}>{data.name}</Text>
                <TouchableOpacity 
                        style={style.settings}
                        onPress={() => setSettingsModal(true)}
                >      
                        <Entypo color={style.txtc} name="cog" size={wp(8)} style={{marginVertical: "auto"}}/>
                </TouchableOpacity>
            </View>
            <View style={style.content}>
                {(data)? (
                    <View style={[style.list, {height: hp(70)}]}>
                        <View style={{margin: "auto"}}>
                            <MaterialIcons name="contacts" size={hp(15)} color={style.txtc} style={{margin: "auto"}}/>
                            <Text style={{textAlign: "center", paddingTop: hp(5), color: style.txtc, fontWeight: "bold", fontSize: wp(9)}}>No contacts yet</Text>
                        </View>
                    </View>
                ):(
                <FlatList
                    data={data.data}
                    renderItem={({item}) => <Item item={item}/>}
                    keyExtractor={item => item.id}
                    style={style.list}
                    removeClippedSubviews={true}
                />
                )}
                 <TouchableOpacity style={style.addbtn} onPress={() => {setAddModal(true)}}>
                    <Ionicons name="add" size={hp(2)} style={style.addicon}/>
                </TouchableOpacity>
                
            </View>
             <SlideUpModal
                visible={settingsModal}
                onClose={() => setSettingsModal(false)}
            >
                <KeyboardAvoidingView
                     behavior="position"
                keyboardVerticalOffset={hp(60)}
                >
                    <ModSettings colors={style.colors} id={id} modRef={modRef} data={data} pointerRef={pointerRef}/>
                </KeyboardAvoidingView>
                </SlideUpModal>
                
                <SlideUpModal
                visible={addModal}
                onClose={() => setAddModal(false)}
            >
                <KeyboardAvoidingView
                     behavior="position"
                keyboardVerticalOffset={hp(60)}
                >

                </KeyboardAvoidingView>
                </SlideUpModal>
            
        </SafeAreaView>
    )
}
function useStyles(){
   
    const colors = useAppColors();
    return StyleSheet.create({
        txtc: colors.txt,
        acc: colors.accent,
        colors: colors,
        container: {
            backgroundColor: colors.background,
            flex: 1
        },
        content: {
            width: wp(100),
            height: hp(75),
            backgroundColor: colors.background
        },
        header: {
            display: "flex",
            flexDirection: "row",
        },
        back: {
            marginVertical: "auto",
            paddingLeft: wp(2)
        },  
        title: {
            color: colors.txt,
            fontWeight: "black",
            fontSize: wp(10),
            maxWidth: wp(80),
            padding: hp(2)
        },
         addicon: {
            margin: "auto",

        },
        addbtn: {
            backgroundColor: colors.accent,
            height: hp(5),
            width: wp(90),
            borderRadius: 10,
            marginHorizontal: "auto",
            top: -hp(1),
        },
        list: {
            width: wp(90),
            marginHorizontal: "auto",
            backgroundColor: colors.compbg,
            padding: wp(2),
            borderRadius: 10
        },
        itemtxt: {
            color: colors.txt,
        },
        listitem: {
            backgroundColor: colors.compbgl,
            borderRadius: 10,
            padding: hp(2),
            marginBottom: hp(2)
        },
        delbtn: {
            backgroundColor: "red",
            width: wp(15),
            height: hp(6.5),
            borderRadius: 10,
        },
        checkbox: {
            color: colors.accent
        },
        loading: {
            flex: 1,
            backgroundColor: colors.background
        },
        settings: {
            position: "absolute",
            right: 0,
            padding: hp(3)
        }
        
    })
}