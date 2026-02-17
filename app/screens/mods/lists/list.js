import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TextInput } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../../firebase";
import useAppColors from "../../../background/Colors";
import SlideUpModal from "../../circlescreens/comps/slidemodal";
import ModSettings from "../../editscreens/modSettings";
import { useModules } from "../useModules";
 const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
export default function List(){
    const { id, name, user, circleID, page} = useLocalSearchParams();
    const logic = useModules(id, user, circleID, page, "list");
    const style = useStyles();
    const nav = useNavigation();
    const [settingsModal, setSettingsModal] = useState(false);
    const [addItem, setAddItem] = useState();
    const modRef = doc(db, "circles", String(circleID), page, user, "list", id);
    const pointerRef = doc(db, "circles", String(circleID), page, user);

    const add = async() => {
        setAddItem("");
        logic.add({
            name: addItem,
            checked: false,
            id: Math.random(),
            url: ""
        });
    }

    const remove = async(item) => {
        logic.remove(item.item);
    }

    const check = async(item) => {
        logic.data.data.find((datai) => datai.id == item.item.id).checked = !(logic.data.data.find((datai) => datai.id == item.item.id).checked );
        logic.update();
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
                <Pressable style={style.listitem} key={item.id} onPress={() => check(item)} >
                    <BouncyCheckbox isChecked={item.item.checked} style={style.checkbox} fillColor={style.acc} text={item.item.name} textStyle={{color: style.txtc}} onPress={() => check(item)}/>
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
                <View style={style.inputcont}>
                    <TextInput
                        value={addItem}
                        onChangeText={setAddItem}
                        style={style.input}
                        placeholder="Add A Item"
                        placeholderTextColor={style.txtc}
                    />
                    <TouchableOpacity style={style.addbtn} onPress={() => {add()}}>
                        <Ionicons name="add" size={hp(2)} style={style.addicon}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={logic.data.data}
                    renderItem={({item}) => <Item item={item}/>}
                    keyExtractor={item => item.id}
                    style={style.list}
                    windowSize={1}
                    removeClippedSubviews={true}
                />

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
            padding: hp(2)
        },
        input: {
            padding: hp(1),
            color: colors.txt,
            width: wp(75)
        },
        inputcont: {
            backgroundColor: colors.compbgl,
            width: wp(90),
            marginHorizontal: "auto",
            borderRadius: 10,
            padding: hp(1),
            display: "flex",
            flexDirection: "row"
        },
        addicon: {
            margin: "auto",

        },
        addbtn: {
            backgroundColor: colors.accent,
            height: hp(5),
            width: hp(5),
            right: wp(1),
            top: hp(.5),
            position: "absolute",
            borderRadius: 10,
        },
        list: {
            width: wp(90),
            marginHorizontal: "auto",
            top: hp(4)
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