import { Dimensions, Platform, StyleSheet } from "react-native";
import useAppColors from "../../../background/Colors";

export default function useStyles() {
    const { width, height } = Dimensions.get("window");
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);
    const colors = useAppColors();

    return StyleSheet.create({
        txtc: colors.txt,
        acc: colors.accent,
        colors: colors,
        container: {
            backgroundColor: colors.background,
            flex: 1
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: hp(1),
            borderBottomWidth: 0.5,
            borderBottomColor: colors.compbg,
        },
        back: {
            paddingLeft: wp(2)
        },
        title: {
            color: colors.txt,
            fontSize: wp(7),
            maxWidth: wp(60),
            paddingLeft: wp(2)
        },
        settings: {
            position: "absolute",
            right: 0,
            paddingRight: wp(4)
        },
        
        // --- CHAT LIST AREA ---
        list: {
            flex: 1,
            paddingHorizontal: wp(3),
        },
        msgWrapper: {
            marginVertical: hp(1),
            maxWidth: wp(80),

        },
        myMsgWrapper: {
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
        },
        theirMsgWrapper: {
            alignSelf: 'flex-start',
            alignItems: 'flex-start',
        },
        senderName: {
            color: colors.txt,
            fontSize: wp(3),
            marginBottom: 2,
            marginLeft: wp(2),
            opacity: 0.7
        },
        bubble: {
            paddingHorizontal: wp(4),
            paddingVertical: hp(1.2),
            borderRadius: 20,
        },
        myBubble: {
            backgroundColor: colors.accent,
            borderBottomRightRadius: 2, // Tail effect
        },
        theirBubble: {
            backgroundColor: colors.compbg,
            borderBottomLeftRadius: 2, // Tail effect
        },
        myText: {
            color: "#FFF", // Usually white on accent colors
            fontSize: wp(4),
        },
        theirText: {
            color: colors.txt,
            fontSize: wp(4),
        },
        pfp: {
            width: hp(5),
            height: hp(5),
            borderRadius: 100,
            marginRight: wp(2),
            marginVertical: "auto"
        },

        inputContainer: {
            flexDirection: "row",
            alignItems: "flex-end",
            paddingHorizontal: wp(3),
            paddingVertical: hp(1.5),
            backgroundColor: colors.background,
            borderTopWidth: 0.5,
            borderTopColor: colors.compbg,
        },
        input: {
            flex: 1,
            backgroundColor: colors.compbg,
            color: colors.txt,
            borderRadius: 20,
            paddingHorizontal: wp(4),
            paddingVertical: Platform.OS === 'ios' ? hp(1) : hp(0.5),
            fontSize: wp(4),
            maxHeight: hp(15), 
        },
        sendBtn: {
            marginLeft: wp(3),
            marginBottom: hp(0.5),
        },

        delbtn: {
            backgroundColor: "red",
            width: wp(15),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginVertical: hp(0.5),
        },
        loading: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background
        },
        
    });
}