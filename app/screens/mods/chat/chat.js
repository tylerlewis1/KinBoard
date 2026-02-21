import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc } from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import {
    ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView,
    Platform,
    Text, TextInput, TouchableOpacity, View
} from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../../firebase";
import { userContext } from "../../../background/Users";
import SlideUpModal from "../../circlescreens/comps/slidemodal";
import ModSettings from "../modsettings/modSettings";
import { useModuleServices } from "../module.services";
import useStyles from "./chat.styles";
import useChat from "./useChat";

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);

export default function Chat() {
    const { id, user, circleID, page } = useLocalSearchParams();
    const services = useModuleServices(id, user, circleID, page, "chat");
    const [settingsModal, setSettingsModal] = useState(false);
    const [msg, setMsg] = useState("");
    const userdata = useContext(userContext);
    const style = useStyles();
    const nav = useNavigation();
    const flatListRef = useRef(null);

    const modRef = doc(db, "circles", String(circleID), page, user, "chat", id);
    const pointerRef = doc(db, "circles", String(circleID), page, user);
    const logic = useChat();

    // Logic for sending
    const onSend = () => {
        if (msg.trim().length === 0) return;
        
        const userName = userdata?.userData?.name || "Unknown User";
        const pfp = userdata?.userData?.pfp || "";
        const userId = userdata?.userData?.uid; // Assuming you have uid in context

        services.add({
            id: Date.now().toString(),
            text: msg,
            pfp: pfp,
            senderName: userName,
            senderId: userId,
            timestamp: new Date().toISOString(),
        });
        logic.sendNotification({text: msg,  senderName: userName, senderId: userdata.userData.uid}, circleID);
        
        setMsg("");
        // Scroll to bottom after sending
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    const remove = async (item) => {
        services.remove(item);
    };

    if (!services.data) {
        return <ActivityIndicator style={style.loading} />;
    }

    const renderRightActions = (item, isMyMsg) => {
        if (!isMyMsg) return null;
        return (
            <TouchableOpacity style={style.delbtn} onPress={() => remove(item)}>
                <Ionicons style={{ margin: "auto" }} size={hp(2.5)} color="white" name="trash" />
            </TouchableOpacity>
        );
    };

    const MessageItem = ({ item }) => {
        const isMyMsg = item.senderId === userdata?.userData?.uid;
        
        return (
            <Swipeable renderRightActions={() => renderRightActions(item, isMyMsg)} >
                <View style={[style.msgWrapper, isMyMsg ? style.myMsgWrapper : style.theirMsgWrapper]}>
                    {!isMyMsg && <Text style={style.senderName}>{item.senderName}</Text>}
                    <View style={{display: "flex", flexDirection: "row"}}>
                        {!isMyMsg && <>{(item.pfp != "") ? (
                        <Image cachePolicy="disk" style={style.pfp} source={{uri: item.pfp}} />   
                        ):(
                            <Image cachePolicy="disk" style={style.pfp} source={require("../../../../assets/images/dpfp.png")}/>  
                        )}</>}
                        
                        
                        <View style={[style.bubble, isMyMsg ? style.myBubble : style.theirBubble]}>
                            <Text style={[style.msgText, isMyMsg ? style.myText : style.theirText]}>
                                {item.text}
                            </Text>
                        </View>
                    </View>  
                </View>
            </Swipeable>
        );
    };

    return (
        <SafeAreaView style={style.container}>
            {/* Header */}
            <View style={style.header}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <Ionicons color={style.txtc} size={wp(6)} name="arrow-back" style={style.back} />
                </TouchableOpacity>
                <Text style={style.title}>{services.data.name}</Text>
                <TouchableOpacity style={style.settings} onPress={() => setSettingsModal(true)}>
                    <Entypo color={style.txtc} name="cog" size={wp(8)} />
                </TouchableOpacity>
            </View>

            {/* Chat Body */}
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={{ flex: 1 }}
                keyboardVerticalOffset={hp(2)}
            >
                <FlatList
                    ref={flatListRef}
                    data={services.data.data}
                    renderItem={({ item }) => <MessageItem item={item} />}
                    keyExtractor={item => item.id}
                    style={style.list}
                    contentContainerStyle={{ paddingBottom: hp(2) }}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                />

                {/* Input Bar */}
                <View style={style.inputContainer}>
                    <TextInput
                        style={style.input}
                        placeholder="Type a message..."
                        placeholderTextColor="#aaa"
                        value={msg}
                        onChangeText={setMsg}
                        multiline
                    />
                    <TouchableOpacity style={style.sendBtn} onPress={onSend}>
                        <Ionicons name="send" size={wp(6)} color={style.colors.primary || "#007AFF"} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* Settings Modal */}
            <SlideUpModal visible={settingsModal} onClose={() => setSettingsModal(false)}>
                <ModSettings colors={style.colors} id={id} modRef={modRef} data={services.data} pointerRef={pointerRef} />
            </SlideUpModal>
        </SafeAreaView>
    );
}