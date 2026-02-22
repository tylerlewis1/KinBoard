import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const createStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: width * 0.07,
        paddingVertical: 25,
    },
    greetingText: {
        fontSize: 22,
        color: colors.txt,
        opacity: 0.7,
        fontWeight: "500",
    },
    nameHighlight: {
        fontSize: 34,
        fontWeight: "900",
        marginTop: -5,
        color: colors.accent
    },
    settingsBtn: {
        backgroundColor: colors.compbg || "#FFF",
        padding: 12,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    main: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    sheetContent: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: 30,
        paddingTop: 15,
        paddingBottom: Platform.OS === 'ios' ? 40 : 30,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.compbg,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: colors.txt,
        opacity: 0.1,
        borderRadius: 10,
        marginBottom: 20,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.txt,
        marginBottom: 25,
    },
    actionButton: {
        flexDirection: "row",
        width: "100%",
        padding: 18,
        borderRadius: 20,
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    actionButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 10,
        padding: 15,
    }
});