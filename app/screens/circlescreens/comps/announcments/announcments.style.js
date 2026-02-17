
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
export const wp = (percent) => width * (percent / 100);
export const hp = (percent) => height * (percent / 100);
export function useStyle(colors){
return StyleSheet.create({
    container: {
        paddingVertical: hp(1),
        marginHorizontal: "auto",
        width: wp(100)
    },
    loadingContainer: {
        paddingVertical: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: colors.compbgl,
        borderWidth: 1,
        borderColor: colors.compbg,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)',
        borderRadius: 10,
        padding: hp(2),
        shadowRadius: 12,
        elevation: 5,
        width: wp(90),
        
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
        backgroundColor: colors.compbgl,
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