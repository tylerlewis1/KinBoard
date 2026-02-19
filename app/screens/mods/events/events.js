import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../../firebase";
import { userContext } from "../../../background/Users";
import SlideUpModal from "../../circlescreens/comps/slidemodal";
import ModSettings from "../modsettings/modSettings";
import { useModuleServices } from "../module.services";
import EventModal from "./eventmodal";
import useStyles from "./events.styles";
import useEvents from "./useEvents";
 const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
export default function Events(){
    const { id, user, circleID, page} = useLocalSearchParams();
    const services = useModuleServices(id, user, circleID, page, "events");
    const [settingsModal, setSettingsModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const userdata = useContext(userContext);
    const style = useStyles();
    const nav = useNavigation();
    const modRef = doc(db, "circles", String(circleID), page, user, "events", id);
    const pointerRef = doc(db, "circles", String(circleID), page, user);
    const logic = useEvents();
    
    const addEvent = async(event) => {
        const userName = userdata?.userData?.name || "Unknown User";
        services.add({
            id: Math.random(),
            name: event.name,
            date: event.date,
            formattedDate: event.formattedDate,
            description: event.description,
            user: userName,
            endDate: event.endDate,
            formattedEndDate: event.formattedEndDate,
            location: event.location
        });
        setAddModal(false)
    }
    const remove = async(item) => {
         services.remove(item.item)
    }

    if(!services.data){
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
                <Pressable style={style.listitem} key={item.id} onPress={() => {logic.addToDeviceCalleneder(item.item)}} >
                    <Text style={style.name}>{item.item.name}</Text>
                    <Text style={style.description}>{item.item.formattedDate} to {item.item.formattedEndDate}</Text>
                    <Text style={style.description}>At {item.item.location}</Text>
                    <Text style={style.description}>Created By: {item.item.user}</Text>
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
                <Text style={style.title}>{services.data.name}</Text>
                <TouchableOpacity 
                        style={style.settings}
                        onPress={() => setSettingsModal(true)}
                >      
                        <Entypo color={style.txtc} name="cog" size={wp(8)} style={{marginVertical: "auto"}}/>
                </TouchableOpacity>
            </View>
            <View style={style.content}>
                {(services.data.data.length == 0)? (
                    <View style={[style.list, {height: hp(70)}]}>
                        <View style={{margin: "auto"}}>
                            <MaterialIcons name="event" size={hp(15)} color={style.txtc} style={{margin: "auto"}}/>
                            <Text style={{textAlign: "center", paddingTop: hp(5), color: style.txtc, fontWeight: "bold", fontSize: wp(9)}}>No Events Yet</Text>
                        </View>
                    </View>
                ):(
                <FlatList
                    data={services.data.data}
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
                    <ModSettings colors={style.colors} id={id} modRef={modRef} data={services.data} pointerRef={pointerRef}/>
                </KeyboardAvoidingView>
                </SlideUpModal>
                 
                <Modal
                    transparent={true}
                    visible={addModal}
                    onClose={() => setAddModal(false)}
                    animationType="fade"
                >
                    <Pressable style={{backgroundColor: "rgba(0, 0, 0, .5)", position: "absolute", width: wp(100), height: hp(100)}} onPress={() => setAddModal(false)}></Pressable>
                    <KeyboardAvoidingView
                     behavior="position"
                    keyboardVerticalOffset={hp(30)}
                >
                    <EventModal colors={style.colors} wp={wp} hp={hp} addEvent={addEvent}/>
                    </KeyboardAvoidingView>
                </Modal>
        </SafeAreaView>
    )
}
