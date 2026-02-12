import { userContext } from '@/app/background/Users';
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { db } from "../../../../firebase";

export default function Announcements({circleData, announcments, colors}) {
    const user = useContext(userContext);
    const [data, setData] = useState(null);
    const [msg, setMsg] = useState("");
    const [hasVoted, setHasVoted] = useState(false);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState("");
    const [type, setType] = useState(false);
    const [modalVis, setModalVis] = useState(false);
    const style = useStyle(colors);
    useEffect(() => {
        setHasVoted(announcments?.voated?.includes(user.userData.uid));
    }, [announcments]);
    
    const vote = async(id) => {
        try {
            const index = announcments.options.findIndex(option => option.id === id);
            let newData = announcments;
            newData.options[index] = {
                id: newData.options[index].id,
                txt: newData.options[index].txt,
                votes: newData.options[index].votes + 1
            }
            newData.voated.push(user.userData.uid);
            
            const announcmentDoc = doc(db, "circles", String(circleData.id));
            const announcmentsDoc = doc(collection(announcmentDoc, "home"), "announcements");
            
            await setDoc(announcmentsDoc, {
                msgs: newData
            });
            newData = null;
        } catch(e) {
            console.log(e);
        }
    }
    
    const send = async() => {
        if(msg == "" && !type) {
            alert("You must enter a message");
            return;
        } else if(question == "" && type) {
            alert("You must enter a question");
            return;
        }
        
        const announcmentDoc = doc(db, "circles", String(circleData.id));
        const announcmentsDoc = doc(collection(announcmentDoc, "home"), "announcements");
        
        try {
            if(!type) {
                await updateDoc(announcmentsDoc, {
                    msgs: {
                        date: new Date(),
                        msg: msg,
                        who: user.userData.name,
                        pfp: user.userData.pfp,
                    }
                })
            } else {
                await updateDoc(announcmentsDoc, {
                    msgs: {
                        date: new Date(),
                        msg: question,
                        who: user.userData.name,
                        pfp: user.userData.pfp,
                        options: options,
                        voated: []
                    }
                })
            }
        } catch(e) {
            console.log(e);
            alert("There was an error posting the announcement");
        }
        
        setModalVis(false);
        setMsg("");
        setQuestion("");
        setOptions([]);
    }

    if(!announcments) {
        return(
            <View style={style.loadingContainer}>
                <ActivityIndicator size="large" color="#2EC4B6"/>
            </View>
        )
    }
    
    const renderRightActions = (progress, dragX, item) => {
        return (
            <TouchableOpacity 
                style={style.delbtn} 
                onPress={() => {
                    const newOptions = options.filter(option => option.id !== item.id);
                    setOptions(newOptions);
                }}
            >
                <Ionicons size={hp(2.5)} color="white" name="trash"/>
            </TouchableOpacity>
        );
    };
    
    const Option = ({item}) => {
        return(
            <Swipeable 
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
            >
                <View style={[style.optionInput, {flexDirection: "row",}]}>
                    <View style={style.optionDot}/>
                    <Text style={style.optionInputText}>{item.txt}</Text>
                </View>
            </Swipeable>
        )
    }
    
    const totalVotes = announcments.options?.reduce((sum, opt) => sum + opt.votes, 0) || 0;
    
    return(
        <View style={style.container}>
            {/* Modal */}
            <Modal
                visible={modalVis}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setModalVis(false);
                    setMsg("");
                    setQuestion("");
                    setOptions([]);
                    setOption("");
                }}
            >
                <Pressable 
                    style={style.modalOverlay} 
                    onPress={() => {
                        setModalVis(false);
                        setMsg("");
                        setQuestion("");
                        setOptions([]);
                        setOption("");
                    }}
                />
                
                <KeyboardAvoidingView 
                    behavior="position"
                    keyboardVerticalOffset={-hp(25)}
                    style={style.keyboardView}
                >
                    <View style={style.modal}>
                        {/* Modal Header */}
                        <View style={style.modalHeader}>
                            <TouchableOpacity 
                                onPress={() => {
                                    setModalVis(false);
                                    setMsg("");
                                    setQuestion("");
                                    setOptions([]);
                                    setOption("");
                                }} 
                                style={style.closeBtn}
                            >
                                <Ionicons name="close" size={hp(3)} color="#666"/>
                            </TouchableOpacity>
                            
                
                            
                            <View style={style.switchContainer}>
                                <Text style={[style.switchLabel, !type && style.switchLabelActive]}>Post</Text>
                                <Switch
                                    trackColor={{ false: '#E0E0E0', true: '#2EC4B6' }}
                                    thumbColor='#FFFFFF'
                                    onValueChange={setType}
                                    value={type}
                                    style={style.switch}
                                />
                                <Text style={[style.switchLabel, type && style.switchLabelActive]}>Poll</Text>
                            </View>
                        </View>
                        
                        {/* Modal Content */}
                        <View style={style.modalContent}>
                            {!type ? (
                                <>
                                    <TextInput
                                        placeholder='What would you like to announce?'
                                        placeholderTextColor="#999"
                                        multiline={true}
                                        onChangeText={setMsg}
                                        value={msg}
                                        style={style.msgbox}
                                    />
                                    <TouchableOpacity 
                                        style={[style.sendBtn, msg === "" && style.sendBtnDisabled]} 
                                        onPress={send}
                                        disabled={msg === ""}
                                    >
                                        <Text style={style.sendBtnText}>Post Announcement</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TextInput
                                        placeholder='Ask a question...'
                                        placeholderTextColor="#999"
                                        onChangeText={setQuestion}
                                        value={question}
                                        style={style.questionBox}
                                    />
                                    
                                    <View style={style.addOptionContainer}>
                                        <TextInput
                                            placeholder='Add an option'
                                            placeholderTextColor="#999"
                                            value={option}
                                            onChangeText={setOption}
                                            style={style.optionInput}
                                        />
                                        <TouchableOpacity
                                            style={[style.addOptionBtn, option === "" && style.addOptionBtnDisabled]}
                                            disabled={option === ""}
                                            onPress={() => {
                                                if(option.trim()) {
                                                    setOptions(prev => [...prev, {
                                                        id: Math.random(),
                                                        txt: option,
                                                        votes: 0
                                                    }]);
                                                    setOption("");
                                                }
                                            }}
                                        >
                                            <Ionicons name="add" size={hp(2.5)} color="#FFFFFF"/>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    {options.length > 0 && (
                                        <View style={style.optionsList}>
                                            <Text style={style.optionsListTitle}>Options ({options.length})</Text>
                                            <FlatList 
                                                data={options}
                                                renderItem={({ item }) => <Option item={item} />}
                                                keyExtractor={item => String(item.id)}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>
                                    )}
                                    
                                    <TouchableOpacity 
                                        style={[style.sendBtn, (question === "" || options.length < 2) && style.sendBtnDisabled]} 
                                        onPress={send}
                                        disabled={question === "" || options.length < 2}
                                    >
                                        <Text style={style.sendBtnText}>Create Poll</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            
            {/* Announcement Card */}
            <View style={style.card}>
                {/* Card Header */}
                <View style={style.cardHeader}>
                    <View style={style.userInfo}>
                        {announcments.pfp ? (
                            <Image style={style.avatar} source={{uri: announcments.pfp}}/>
                        ) : (
                            <Image 
                                cachePolicy="disk" 
                                style={style.avatar} 
                                source={require("../../../../assets/images/logotb.png")}
                            />
                        )}
                        <View style={style.userDetails}>
                            <Text style={style.userName}>{announcments.who}</Text>
                            <Text style={style.timestamp}>
                                {announcments.date?.toDate?.()?.toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}
                            </Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        style={style.createBtn} 
                        onPress={() => setModalVis(true)}
                    >
                        <Ionicons name="add" size={hp(2.5)} color="#FFFFFF"/>
                        <Text style={style.createBtnText}>Create</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Message Content */}
                <View style={style.messageContainer}>
                    <Text style={style.messageText}>{announcments.msg}</Text>
                </View>
                
                {/* Poll Options */}
                {announcments.options && (
                    <View style={style.pollContainer}>
                        {announcments.options.map((option, index) => {
                            const percentage = totalVotes > 0 
                                ? Math.round((option.votes / totalVotes) * 100) 
                                : 0;
                            
                            return(
                                <TouchableOpacity 
                                    key={option.id} 
                                    style={[
                                        style.pollOption,
                                        hasVoted && style.pollOptionVoted
                                    ]} 
                                    onPress={() => vote(option.id)} 
                                    disabled={hasVoted}
                                    activeOpacity={hasVoted ? 1 : 0.7}
                                >
                                    {hasVoted && (
                                        <View 
                                            style={[
                                                style.pollBar,
                                                { width: `${percentage}%` }
                                            ]}
                                        />
                                    )}
                                    <View style={style.pollContent}>
                                        <View style={style.pollTextContainer}>
                                            <View style={style.pollDot}/>
                                            <Text style={style.pollOptionText}>{option.txt}</Text>
                                        </View>
                                        <View style={style.pollStats}>
                                            {hasVoted && (
                                                <Text style={style.pollPercentage}>{percentage}%</Text>
                                            )}
                                            <Text style={style.pollVotes}>{option.votes}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity> 
                            );
                        })}
                        {hasVoted && totalVotes > 0 && (
                            <Text style={style.totalVotes}>{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
function useStyle(colors){
return StyleSheet.create({
    container: {
        paddingVertical: hp(1),
    },
    loadingContainer: {
        paddingVertical: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: colors.compbg,
        borderRadius: 20,
        padding: hp(2),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
        width: wp(90)
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp(1.5),
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    avatar: {
        width: hp(5),
        height: hp(5),
        borderRadius: hp(2.5),
        backgroundColor: "#3A3A3C",
    },
    userDetails: {
        marginLeft: wp(3),
        flex: 1,
    },
    userName: {
        fontSize: hp(1.9),
        fontWeight: "600",
        color: colors.txt,
        marginBottom: hp(0.3),
    },
    timestamp: {
        fontSize: hp(1.5),
        color: "#8E8E93",
    },
    createBtn: {
        backgroundColor: colors.accent,
        paddingHorizontal: wp(3.5),
        paddingVertical: hp(1),
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: wp(1.5),
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    createBtnText: {
        color: colors.txt,
        fontSize: hp(1.7),
        fontWeight: "600",
    },
    messageContainer: {
        marginVertical: hp(1.5),
        paddingHorizontal: wp(1),
    },
    messageText: {
        fontSize: hp(2),
        lineHeight: hp(2.8),
        color: colors.txt,
        fontWeight: "400",
    },
    pollContainer: {
        marginTop: hp(1.5),
        gap: hp(1.2),
        
    },
    pollOption: {
        backgroundColor: colors.compbgd,
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
    },
    pollOptionVoted: {
        backgroundColor: colors.compbgd,
        borderWidth: 1,
        borderColor: colors.compbgd,
    },
    pollBar: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(46, 196, 182, 0.2)",
        borderRadius: 14,
    },
    pollContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: hp(1.8),
        zIndex: 1,
    },
    pollTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: wp(3),
        
    },
    pollDot: {
        width: hp(0.8),
        height: hp(0.8),
        borderRadius: hp(0.4),
        backgroundColor: colors.accent,
        
    },
    pollOptionText: {
        fontSize: hp(1.8),
        color: colors.txt,
        fontWeight: "500",
        flex: 1,
        
    },
    pollStats: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp(3),
        
    },
    pollPercentage: {
        fontSize: hp(1.7),
        color: colors.accent,
        fontWeight: "700",
        minWidth: wp(10),
        textAlign: "right",
    },
    pollVotes: {
        fontSize: hp(1.6),
        color: "#838386",
        fontWeight: "600",
        minWidth: wp(6),
        textAlign: "right",
    },
    totalVotes: {
        fontSize: hp(1.5),
        color: "#8E8E93",
        textAlign: "center",
        marginTop: hp(0.5),
    },
    
    // Modal Styles
    modalOverlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        width: wp(100),
        height: hp(100),
        position: "absolute",
    },
    keyboardView: {
        width: wp(100),
        height: hp(100),
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: colors.compbg,
        width: wp(90),
        maxHeight: hp(70),
        borderRadius: 24,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    modalHeader: {
        backgroundColor: colors.background,
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        borderBottomWidth: 1,
        borderBottomColor: colors.compbgd,
        position: "relative",
    },
    closeBtn: {
        position: "absolute",
        left: wp(4),
        top: hp(1.5),
        zIndex: 10,
        padding: hp(0.5),
    },
    modalTitle: {
        fontSize: hp(2.2),
        fontWeight: "700",
        color: colors.txt,
        textAlign: "center",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp(2),
        backgroundColor: colors.compbgd,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        borderRadius: 20,
        margin: "auto"
    },
    switchLabel: {
        fontSize: hp(2),
        color: colors.txt,
        fontWeight: "600",
    },
    switchLabelActive: {
        color: colors.accent,
    },
    switch: {
        transform: [{ scale: 0.8 }],
    },
    modalContent: {
        padding: wp(5),
        paddingBottom: hp(3),
    },
    msgbox: {
        backgroundColor: colors.compbgd,
        borderRadius: 16,
        padding: wp(4),
        fontSize: hp(1.9),
        color: colors.txt,
        minHeight: hp(20),
        textAlignVertical: "top",
        borderWidth: 1,
        borderColor: colors.compbg,
        marginBottom: hp(2),
    },
    questionBox: {
        backgroundColor: colors.compbgd,
        borderRadius: 16,
        padding: wp(4),
        fontSize: hp(1.9),
        color: colors.txt,
        borderWidth: 1,
        borderColor: colors.compbg,
        marginBottom: hp(2),
    },
    addOptionContainer: {
        flexDirection: "row",
        gap: wp(2),
        marginBottom: hp(2),
    },
    optionInput: {
        flex: 1,
        backgroundColor: colors.compbgd,
        borderRadius: 14,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        fontSize: hp(1.8),
        color: colors.txt,
        borderWidth: 1,
        borderColor: colors.compbg,
        
    },
    optionInputText: {
        fontSize: hp(1.8),
        color: colors.txt,
        fontWeight: "500",
        flex: 1,
    },
    optionDot: {
        width: hp(0.7),
        height: hp(0.7),
        borderRadius: hp(0.35),
        marginVertical: "auto",
        marginRight: wp(2),
        backgroundColor: colors.accent,
    },
    addOptionBtn: {
        backgroundColor: colors.accent,
        width: hp(5.5),
        height: hp(5.5),
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3,
    },
    addOptionBtnDisabled: {
        backgroundColor: "#3A3A3C",
        shadowOpacity: 0,
    },
    optionsList: {
        maxHeight: hp(20),
        marginBottom: hp(2),
        
    },
    optionsListTitle: {
        fontSize: hp(1.6),
        color: "#8E8E93",
        fontWeight: "600",
        marginBottom: hp(1),
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    sendBtn: {
        backgroundColor: "#2EC4B6",
        paddingVertical: hp(2),
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    sendBtnDisabled: {
        backgroundColor: "#3A3A3C",
        shadowOpacity: 0,
    },
    sendBtnText: {
        color: "#FFFFFF",
        fontSize: hp(2),
        fontWeight: "700",
        letterSpacing: 0.3,
    },
    delbtn: {
        backgroundColor: "#FF3B30",
        justifyContent: "center",
        alignItems: "center",
        width: wp(15),
        borderRadius: 14,
        marginVertical: hp(0.5),
    },
});
}