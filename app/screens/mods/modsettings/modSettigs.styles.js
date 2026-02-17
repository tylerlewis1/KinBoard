import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
 export default function useStyle(colors){
    return StyleSheet.create({
        container: {
        backgroundColor: colors.background,
        borderRadius: 20
        }, content:{
            padding: wp(5),
        }, cover: {
            width: hp(7),
            height: hp(7),
            borderRadius: 1000
            
        }, header: {
            display: "flex",
            flexDirection: "row",
            gap: wp(2)

        },
        title: {
            fontSize: hp(4),
            fontWeight: "500",
            marginVertical: "auto",
            color: colors.txt,
            width: wp(80)
        },
        btn: {
            width: wp(90),
            borderWidth: 1,
            marginTop: hp(2),
            padding: hp(1),
            backgroundColor: colors.compbgl,
            borderColor: colors.compbg
        }, btntxt: {
            textAlign: "center",
            fontWeight: "700",
            fontSize: hp(3),
            color: colors.txt
        },date: {
            color: colors.txt
        }
        
    });
}