import { userContext } from '@/app/background/Users';
import { Image } from 'expo-image';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { db } from "../../../../firebase";
export default function Announcments({circleData, announcments}) {
    const user = useContext(userContext);
    const [data, setData] = useState(null);
    const [msg, setMsg] = useState("");
    const [modalVis, setModalVis] = useState(false);
    const send = async() => {
        if(msg == ""){
            alert("You must enter a message");
            return;
        }
        const announcmentDoc = doc(db, "circles", String(circleData.id));
        const announcmentsDoc = doc(collection(announcmentDoc, "home"), "announcements");
        try{
            await updateDoc(announcmentsDoc, {
                msgs: arrayUnion({
                    date: new Date(),
                    msg: msg,
                    who: user.userData.name,
                    pfp: user.userData.pfp
                })
            })
        }catch(e){
            console.log(e);
            alert("There was a error posting the announcment");
        }
        setModalVis(false);
        setMsg("");
    }

    if(!announcments){
        return(
            <ActivityIndicator/>
        )
    }
    return(
        <View style={style.continer}>
            <Modal
                visible={modalVis}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setModalVis(false) 
                    setMsg("")
                }}
            >
                <Pressable style={{backgroundColor: "rgba(0, 0, 0, .5)", width: wp(100), height: hp(100), zIndex: 10000}} onPress={() => {
                    setModalVis(false)
                    setMsg("");
                    }}>
                </Pressable>
                <KeyboardAvoidingView 
                    behavior="position"
                    keyboardVerticalOffset={-hp(25)}
                    contentContainerStyle={{width: wp(100), height: hp(100), position: "absolute"}}
                >
                    <View style={style.modal}>
                        <View style={style.top}>
                            <Text style={{fontSize: wp(6)}}>New Announcment</Text>
                            <TouchableOpacity onPress={() => {
                                setModalVis(false)
                                setMsg("");
                                }} style={style.closebtn}><Text style={{fontSize: wp(6)}}>X</Text></TouchableOpacity>
                        </View>
                        <View style={style.form}>
                            <TextInput
                                placeholder='Message'
                                multiline={true}
                                onChangeText={setMsg}
                                value={msg}
                                style={style.msgbox}
                            />
                            <TouchableOpacity style={style.btn} onPress={() => {send()}}><Text style={style.btntxt}>Send</Text></TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            <View>
                
                <View style={style.header}>
                    {(announcments[announcments.length -1].pfp) ? (
                        <Image style={style.img} source={{uri: announcments[announcments.length -1].pfp}}/>
                    ):(
                        <Image cachePolicy="disk" style={style.img} source={require("../../../../assets/images/logotb.png")}/>
                    )}
                    <Text style={style.name}>{announcments[announcments.length -1].who}</Text>
                    <TouchableOpacity style={style.post} onPress={() => {setModalVis(true)}}>
                        <Text>Create</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.msg}>
                    <Text style={style.msgtxt}>{announcments[announcments.length -1].msg}</Text>
                </View>
                <Text style={{paddingVertical: hp(1)}}>{(announcments[announcments.length - 1].date.toDate()).toLocaleString()}</Text>
            </View>
        </View>
    );
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    continer: {
        backgroundColor: "#ffffff",
        width: wp(87),
        margin: "auto",
        padding: hp(2),
        borderRadius: 10
    },
    header: {
        paddingBottom: hp(2),
        display: "flex",
        flexDirection: "row",
        gap: wp(2)
    },
    msg: {
       width: wp(80),
       margin: "auto",
    },
    msgtxt: {
        fontSize: hp(2),
        fontWeight: "400"
    },
    img: {
        width: hp(4),
        height: hp(4),
        borderRadius: 1000
    },
    name: {
        marginTop: hp(1),
        fontWeight: "bold"
    },
    post: {
        position: "absolute",
        right: wp(1.5),
        backgroundColor: "#2EC4B6",
        padding: wp(1),
        borderRadius: 10
    },
    modal: {
        backgroundColor: "#ececec",
        width: wp(90),
        top: hp(30),
        left: wp(5),
        zIndex: 10001,
        position: "absolute"
    },
    top: {
        width: wp(90),
        padding: hp(2),
        display: 'flex',
        flexDirection: "row"
    },
    closebtn: {
        position: "absolute",
        fontSize: hp(4),
        right: wp(4),
        top: hp(1.5)
    },
    form: {
        backgroundColor: "#e3e0e0",
        height: hp(35)
    },
    msgbox: {
        width: wp(80),
        left: wp(5),
        top: hp(2),
        height: hp(20),
        padding: wp(2),
        backgroundColor: "#c5c3c3",
        fontSize: wp(4)
    },
    btn: {
        backgroundColor: "#2EC4B6",
        width: wp(30),
        padding: hp(2),
        margin: "auto",
        borderRadius: 10
    },
    btntxt: {
        textAlign: "center",
        fontWeight: "bold"
    }

});