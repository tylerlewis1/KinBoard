
import useAppColors from "@/app/background/Colors";
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
export default function useStyles() {
const colors = useAppColors();
return StyleSheet.create({
   content: {
      backgroundColor: colors.background,
   }, 
   header: {
        display: "flex",
        flexDirection: "row",
   },
   settings: {
      position: "absolute",
      right: wp(5),
      top: hp(3),
      color: colors.txt
   },
   greeting: {
    fontSize: wp(7),
    fontWeight: "bold",
    paddingTop: wp(6),
    paddingLeft: wp(3),
    color: colors.txt
   },
   top: {
    height: hp(10),
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.background
   },
   main: {
    height: hp(75),
   },
   modal: {
      height: hp(100),
      width: wp(100),
      backgroundColor: "rgba(0, 0, 0, .4)",
      zIndex: 1000,
   },
   modalcontent: {
      width: wp(90),
      height: hp(30), 
      backgroundColor: colors.background,
      zIndex: 1001,
      position: "absolute",
      top: hp(25),
      left: wp(5),
      borderRadius: 20
   },
   form: {
      width: wp(70),
      height: hp(20),
      display: "block",
      margin: "auto"
   },
   input: {
        width: wp(60),
        backgroundColor: colors.background,
        display: "block",
        margin: "auto",
        padding: 20,
        color: "#000000",
        borderRadius: 20,
        fontSize: 17,
    },
    title: {
      fontSize: hp(3),
      textAlign: "center",
      color: colors.txt
    },
      button: {
        backgroundColor: colors.accent,
        width: "80%",
        display: "block",
        margin: "auto", 
        padding: hp(2),
        borderRadius: 20
    },
    buttontxt: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20,
        color: colors.txt
    },
    txt: colors.txt
});
}