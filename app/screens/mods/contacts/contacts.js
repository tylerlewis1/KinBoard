import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView, Linking, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../../firebase";
import useAppColors from "../../../background/Colors";
import SlideUpModal from "../../circlescreens/comps/slidemodal";
import ModSettings from "../modsettings/modSettings";
import { useModules } from "../useModules";
import ContactModal from "./contactmodal";
 const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
export default function Contacts(){
    const { id, user, circleID, page} = useLocalSearchParams();
    const logic = useModules(id, user, circleID, page, "contacts");
    const [settingsModal, setSettingsModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const style = useStyles();
    const nav = useNavigation();
   
    const modRef = doc(db, "circles", String(circleID), page, user, "contacts", id);
    const pointerRef = doc(db, "circles", String(circleID), page, user);
    
    const addContact = async(contact) => {
      logic.add({
            name: contact.name,
            phone: contact.phone,
            id: Math.random(),
            description: contact.description
        });
        setAddModal(false)
    }
    const remove = async(item) => {
         logic.remove(item.item)
    }

    if(!logic.data){
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
                <Pressable style={style.listitem} key={item.id} onPress={() => {Linking.openURL(`tel:${item.item.phone}`)}} >
                    <Text style={style.name}>{item.item.name}</Text>
                    <Text style={style.phone}>{item.item.phone}</Text>
                    <Text style={style.description}>{item.item.description}</Text>
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
                <Text style={style.title}>{logic.data.name}</Text>
                <TouchableOpacity 
                        style={style.settings}
                        onPress={() => setSettingsModal(true)}
                >      
                        <Entypo color={style.txtc} name="cog" size={wp(8)} style={{marginVertical: "auto"}}/>
                </TouchableOpacity>
            </View>
            <View style={style.content}>
                {(logic.data.data.length == 0)? (
                    <View style={[style.list, {height: hp(70)}]}>
                        <View style={{margin: "auto"}}>
                            <MaterialIcons name="contacts" size={hp(15)} color={style.txtc} style={{margin: "auto"}}/>
                            <Text style={{textAlign: "center", paddingTop: hp(5), color: style.txtc, fontWeight: "bold", fontSize: wp(9)}}>No contacts yet</Text>
                        </View>
                    </View>
                ):(
                <FlatList
                    data={logic.data.data}
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
                    <ModSettings colors={style.colors} id={id} modRef={modRef} data={logic.data} pointerRef={pointerRef}/>
                </KeyboardAvoidingView>
                </SlideUpModal>
                
                <Modal
                transparent={true}
                visible={addModal}
                onClose={() => setAddModal(false)}
                animationType="fade"
            >
                    <Pressable style={{backgroundColor: "rgba(0, 0, 0, .2)", position: "absolute", width: wp(100), height: hp(100)}} onPress={() => setAddModal(false)}></Pressable>
                    <ContactModal colors={style.colors} wp={wp} hp={hp} addContact={addContact}/>
                </Modal>
            
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
            marginBottom: hp(2),
            height: hp(13)
        },
        delbtn: {
            backgroundColor: "red",
            width: wp(15),
            height: hp(13),
            borderRadius: 10,
        },
        phone:{
             color: colors.txt
        },
        name: {
            fontSize: wp(10),
            color: colors.txt
        },
        description: {
             color: colors.txt
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