import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebase";
import useAppColors from "../../background/Colors";
import { userContext } from "../../background/Users";
import ModSettings from "../../screens/editscreens/modSettings";
import SlideUpModal from "../circlescreens/comps/slidemodal";
import ChoreModal from "./comps/choremodal";
 const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
export default function Chores(){
    const { id, user, circleID, page} = useLocalSearchParams();
    const userdata = useContext(userContext);
    const [data, setData] = useState(null);
    const [settingsModal, setSettingsModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const style = useStyles();
    const nav = useNavigation();
   
    const modRef = doc(db, "circles", String(circleID), page, user, "chores", id);
    const pointerRef = doc(db, "circles", String(circleID), page, user);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(modRef, (snapshot) => {
            setData(snapshot.data());
        }, (e) => {
            console.error("Listener failed: ", e);
        });
        return unsubscribe;
        
    }, []);
    const addChore = async(chore, repeat) => {
        try{
            await updateDoc(modRef, {
                data: arrayUnion({
                    name: chore.name,
                    who: chore.who,
                    id: Math.random(),
                    description: chore.description,
                    lastdoneby: null,
                    lastdone: null,
                    repeat: repeat
                })
            })
            setAddModal(false)
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
    const showAlert = (item) => {
         Alert.alert("Yay!", "Do you want to check off this task?", [
            {
                text: "Yes",
                onPress: () => {check(item)}
            },{
                text: "No",
                style: "cancel",
                onPress: () => {return}
            }
        ]);
    }

    const check = async(item) => {
        
        if(item.item.repeat == null){
            remove(item)
            return;
        }
        try{
            data.data.find((datai) => datai.id == item.item.id).lastdone = Date();
            data.data.find((datai) => datai.id == item.item.id).lastdoneby = userdata.userData.name;
            await updateDoc(modRef, {
                data: data.data
            });
        }catch(e){
            console.log(e);
            alert("error");
        }
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
                <Ionicons style={{margin: "auto"}}size={hp(2.5)} color="black" name="trash"/>
            </TouchableOpacity>
        );
    };

    const Item = (item) => {
        let formattedDateTime = null;
        let done = true;
        //format time
        if(item.item.lastdone != null){
            const dateObject = new Date(item.item.lastdone);
            const now = new Date();
            const options = {
                weekday: 'short', 
                hour: 'numeric', 
                minute: 'numeric',
                hour12: true 
            };
            if(item.item.repeat == "Daily" && (dateObject.getDate() != now.getDate())){
                done = false; 
            }if(item.item.repeat == "Every Other Day" && (Number(now.getDate()) - Number(dateObject.getDate()) ) >= 2){
                done = false; 
            }if(item.item.repeat == "Weekly" && (Number(now.getDate()) - Number(dateObject.getDate()) ) >= 7){
                done = false; 
            }if(item.item.repeat == "Biweekly" && (Number(now.getDate()) - Number(dateObject.getDate()) ) >= 14){
                done = false; 
            }if(item.item.repeat == "Monthly" && (Number(now.getDate()) - Number(dateObject.getDate()) ) >= 30){
                done = false; 
            }if(item.item.repeat == "6 Months" && (Number(now.getDate()) - Number(dateObject.getDate()) ) >= 181){
                done = false; 
            }if(item.item.repeat == "Yearly" && (Number(now.getDate()) - Number(dateObject.getDate()) ) >= 365){
                done = false; 
            }
            
            formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateObject);
        }

        return(
            <Swipeable 
                
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
            >
                <Pressable  style={[style.listitem, done ? {backgroundColor: "#4af166"}: {backgroundColor: "#ce3232"}]} key={item.id} onPress={() => {showAlert(item)}} >
                {done? (
                    <MaterialIcons size={hp(5)} style={style.icon} color="black" name="check-circle-outline"/>
                
                ):(
                    <Entypo size={hp(5)} style={style.icon} color="black" name="circle-with-cross"/>
                
                )}
                <View>
                    <Text style={style.name}>{item.item.name}</Text>
                    {(item.item.description != null) ? (
                        <Text style={style.assignment}>{item.item.description}</Text>
                   ):(<></>)}
                   {(item.item.who != null) ? (
                    <Text style={style.assignment}>Assigned to: {item.item.who}</Text>
                   ):(<></>)}
                    {(item.item.lastdone != null) ? (
                        <Text style={{color: "black", fontSize: wp(3)}}>Last done: {formattedDateTime} by {item.item.lastdoneby}</Text>
                    ): (<></>)}
                   {(item.item.repeat != null) ? (
                        <Text style={{color: "black", fontSize: wp(3)}}>Repeat:  {item.item.repeat}</Text>
                    ): (<></>)}
                </View>
            
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
                {(data.data.length == 0)? (
                    <View style={[style.list, {height: hp(70)}]}>
                        <View style={{margin: "auto"}}>
                            <MaterialIcons name="check" size={hp(15)} color={style.txtc} style={{margin: "auto"}}/>
                            <Text style={{textAlign: "center", paddingTop: hp(5), color: style.txtc, fontWeight: "bold", fontSize: wp(9)}}>Nothing to do!</Text>
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
                    <Modal
                        transparent={true}
                        visible={addModal}
                        onClose={() => setAddModal(false)}
                        animationType="fade"
                    >
                    <Pressable style={{backgroundColor: "rgba(0, 0, 0, .2)", position: "absolute", width: wp(100), height: hp(100)}} onPress={() => setAddModal(false)}></Pressable>
                        <KeyboardAvoidingView
                            behavior="position"
                            style={{top: hp(30)}}
                        >
                           
                            <ChoreModal colors={style.colors} wp={wp} hp={hp} addChore={addChore}/>
                        </KeyboardAvoidingView>
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
        nmtxt: "#d5d3d3",
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
        assignment: {
            color: "black",
        },
        listitem: {
            borderRadius: 10,
            padding: hp(2),
            marginBottom: hp(2),
            display: "flex",
            flexDirection: "row"
        },
        delbtn: {
            backgroundColor: "red",
            width: wp(15),
            height: "auto",
            borderRadius: 10,
            marginBottom: hp(2),

        },
        phone:{
             color: colors.txt
        },
        name: {
            fontSize: wp(8),
            color: "black"
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
        },
        icon: {
            marginVertical: "auto",
            paddingRight: wp(5)
        }
        
    })
}