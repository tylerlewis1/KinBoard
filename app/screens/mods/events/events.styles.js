import { Dimensions, StyleSheet } from "react-native";
import useAppColors from "../../../background/Colors";
export default function useStyles(){
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
        itemtxt: {
            color: colors.txt,
        },
        listitem: {
            backgroundColor: colors.compbgl,
            borderRadius: 10,
            padding: hp(2),
            marginBottom: hp(2),
        },
        delbtn: {
            backgroundColor: "red",
            width: wp(15),
            height: "max",
            marginBottom: hp(2),
            borderRadius: 10,
        },
        phone:{
             color: colors.txt
        },
        name: {
            fontSize: wp(8),
            color: colors.txt,
            width: wp(75)
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
        
        
    });
}