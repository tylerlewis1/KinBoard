
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);

export default StyleSheet.create({
   header: {
        display: "flex",
        flexDirection: "row",
   },
   settings: {
      position: "absolute",
      right: wp(5),
      top: hp(3)
   },
   greeting: {
    fontSize: hp(4),
    fontWeight: "bold",
    paddingTop: wp(6),
    paddingLeft: wp(3)
   },
   top: {
    height: hp(10),
    display: "flex",
    flexDirection: "row"
   },
   main: {
    height: hp(75),
   },
   modal: {
      height: hp(100),
      width: wp(100),
      backgroundColor: "rgba(0, 0, 0, .4)",
      zIndex: 1000
   },
   modalcontent: {
      width: wp(90),
      height: hp(30), 
      backgroundColor: "white",
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
        backgroundColor: "#d7d7d7",
        display: "block",
        margin: "auto",
        padding: 20,
        color: "#000000",
        borderRadius: 20,
        fontSize: 17,
        
    },
    title: {
      fontSize: hp(3),
      textAlign: "center"
    },
      button: {
        backgroundColor: "#2EC4B6",
        width: "80%",
        display: "block",
        margin: "auto", 
        padding: hp(2),
        
        borderRadius: 20
    },
    buttontxt: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20
    }
});