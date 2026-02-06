import { userContext } from '@/app/background/Users';
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { db } from "../../../../firebase";
export default function Announcments({circleData, announcments}) {
    const user = useContext(userContext);
    const [data, setData] = useState(null);
    const [msg, setMsg] = useState("");
    const [hasVoted, setHasVoted] = useState(false);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState("");
    const [type, setType] = useState(false);
    const [modalVis, setModalVis] = useState(false);
    const send = async() => {
        if(msg == "" && !type){
            alert("You must enter a message");
            return;
        } else if(question == "" && type){
            alert("You must enter a question");
            return;
        }
        const announcmentDoc = doc(db, "circles", String(circleData.id));
        const announcmentsDoc = doc(collection(announcmentDoc, "home"), "announcements");
        try{
            if(!type){
                await updateDoc(announcmentsDoc, {
                    msgs: arrayUnion({
                        date: new Date(),
                        msg: msg,
                        who: user.userData.name,
                        pfp: user.userData.pfp,
                    })
                })
            } else {
                await updateDoc(announcmentsDoc, {
                    msgs: arrayUnion({
                        date: new Date(),
                        msg: question,
                        who: user.userData.name,
                        pfp: user.userData.pfp,
                        options: options,
                        voated: []
                    })
                })
            }
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
    const renderRightActions = (progress, dragX, item) => {
        return (
            <TouchableOpacity style={[style.delbtn]} onPress={() => {
                const newOptions = options.filter(option => option.id !== item.id);
                setOptions(newOptions);
            }}>
                <Ionicons size={hp(3)} style={style.deltxt} color="white" name="trash"/>
            </TouchableOpacity>
        );
    };
    const Option = ({item}) =>{
        return(
            
           <Swipeable style={style.option} renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}>
                <View style={style.option}>
                    <Text>{item.txt}</Text>
                </View>
            </Swipeable>
            
        )
    }
    const Slidebar = () =>{
        return(
            <Switch
                trackColor={{ false: '#dfdde1', true: '#2EC4B6' }}
                thumbColor={(type) ? '#dfdde1' : '#2EC4B6'}
                onValueChange={setType}
                value={type}
                style={{position: "absolute", top: hp(2), left: wp(4)}}
            /> 
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
                    setMsg("");
                    setQuestion("");
                    setOptions([]);
                    setOption("");
                }}
            >
                <Pressable style={{backgroundColor: "rgba(0, 0, 0, .5)", width: wp(100), height: hp(100), zIndex: 10000}} onPress={() => {
                    setModalVis(false) 
                    setMsg("");
                    setQuestion("");
                    setOptions([]);
                    setOption("");
                    }}>
                </Pressable>
                <KeyboardAvoidingView 
                    behavior="position"
                    keyboardVerticalOffset={-hp(25)}
                    contentContainerStyle={{width: wp(100), height: hp(100), position: "absolute"}}
                >
                    <View style={style.modal}>
                        {(!type)? (
                            <>
                                <View style={style.top}>
                                    <Slidebar/>
                                    <Text style={{fontSize: wp(6), margin: "auto"}}>New Announcment</Text>
                                    
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
                            </>
                        ):(
                            <>
                              <View style={[style.top]}>
                                    <Slidebar/>
                                    <Text style={{fontSize: wp(6), margin: "auto"}}>New poll</Text>
                                    <TouchableOpacity onPress={() => {
                                        setModalVis(false) 
                                        setMsg("");
                                        setQuestion("");
                                        setOptions([]);
                                        setOption("");
                                        }} style={style.closebtn}><Text style={{fontSize: wp(6)}}>X</Text></TouchableOpacity>
                                </View>
                                <View style={style.form}>
                                    <TextInput
                                        placeholder='Question'
                                        onChangeText={setQuestion}
                                        value={question}
                                        style={style.questionBox}
                                    />
                                    <View style={[style.option, {display: "flex", flexDirection: "row"}]}>
                                        <TextInput
                                            placeholder='Option'
                                            value={option}
                                            onChangeText={setOption}
                                            style={{width: "90%"}}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                setOptions(prev => [...prev, {
                                                    id: Math.random(),
                                                    txt: option,
                                                    votes: 0
                                                }]);
                                                setOption("")
                                            }}
                                        ><Text>Add</Text></TouchableOpacity>
                                    </View>
                                    <FlatList 
                                        style={style.options}
                                        data={options}
                                        renderItem={({ item }) => <Option item={item} />}
                                        keyExtractor={item => item.id}
                                    />
                                        
                                    
                                    <TouchableOpacity style={style.btn} onPress={() => {send()}}><Text style={style.btntxt}>Post</Text></TouchableOpacity>
                                </View>
                            </>
                        )}
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
                    {(announcments[announcments.length - 1].options)? (
                        <>
                        {
                            announcments[announcments.length - 1].options.map((option) => {
                                if(!hasVoted){
                                    return(
                                        <TouchableOpacity key={option.key} style={style.option}>
                                                <Text>{option.txt}</Text>
                                                <Text style={{position: "absolute", right: wp(4), top: hp(1)}}>{option.votes}</Text>
                                        </TouchableOpacity> 
                                        
                                    )
                                } else {
                                    return(
                                        <View key={option.key} style={style.option}>
                                                <Text>{option.txt}</Text>
                                                <Text style={{position: "absolute", right: wp(4), top: hp(1)}}>{option.votes}</Text>
                                        </View> 
                                    )
                                }
                            })
                        }
                        </>
                    ):(<></>)}
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
        borderRadius: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
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
        borderRadius: 10,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
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
        height: hp(25),
        padding: wp(2),
        backgroundColor: "#c5c3c3",
        fontSize: wp(4)
    },
    questionBox: {
        width: wp(80),
        left: wp(5),
        marginTop: hp(2),
        padding: wp(2),
        backgroundColor: "#c5c3c3",
        fontSize: wp(4)
    },
    btn: {
        backgroundColor: "#2EC4B6",
        width: wp(30),
        padding: hp(2),
        margin: "auto",
        borderRadius: 10,
        marginBottom: hp(1)
        
    },
    btntxt: {
        textAlign: "center",
        fontWeight: "bold"
    },
    options: {
        width: wp(70),
        margin: "auto",
        maxHeight: hp(17),
        marginBottom: 10
    },
    option: {
        width: wp(70),
        backgroundColor: "#d8d1d1",
        marginTop: hp(1),
        margin: "auto",
        padding: hp(1),
        display: "flex",
        flexDirection: "row"
    }, 
    delbtn: {
        backgroundColor: "red",
        marginTop: hp(1),
        width: wp(15)
    },deltxt: {
        margin: "auto"
    }

});