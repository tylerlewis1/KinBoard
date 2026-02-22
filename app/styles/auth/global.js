
import useAppColors from "@/app/background/Colors";
import { StyleSheet } from "react-native";
export default function useStyles(){ 
    const colors = useAppColors();
return StyleSheet.create({

    header:{
        fontSize: "80",
        fontWeight: "bold",
        textAlign: "center",
    },
    logo: {
        width: "70%",
        margin: "auto",
        height: "45%",
    },
    txtinput: {
        width: "80%",
        backgroundColor: colors.offtxt,
        display: "block",
        margin: "auto",
        padding: 20,
        color: "black",
        borderRadius: 20,
        fontSize: 17,
        marginBottom: 20,
        
    },
    button: {
        backgroundColor: "#2EC4B6",
        width: "80%",
        display: "block",
        margin: "auto", 
        padding: 20,
        
        borderRadius: 20
    },
    buttontxt: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20
    },
    bg: {
        backgroundColor: colors.background,
        flex: 1
    },
    txt: colors.txt
    
    
});
}