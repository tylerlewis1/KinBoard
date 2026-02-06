
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);

export default StyleSheet.create({
   container: {
   
    },
    header: {
        display: "flex",
        flexDirection: "row",
        width: wp(100),
    },
    img: {
        width: hp(7),
        height: hp(7),
        borderRadius: 100,
        marginLeft: wp(2),
    },
    name: {
        paddingLeft: wp(3),
        paddingTop: hp(2.8),
        fontSize: hp(2),
        fontWeight: 'bold'
    },
    back: {
        marginTop: hp(2.5),
        paddingHorizontal: wp(3)
    },
    hr: {
        width: wp(100),
        height: 2,
        backgroundColor: "#d6d3d3",
        marginTop: hp(1),
    },
    settings: {
      position: "absolute",
      right: wp(5),
      top: hp(2)
   },
   add: {
    position: "absolute",
    bottom: hp(1),
    right: wp(6),
    backgroundColor: "#2EC4B6",
    width: hp(7),
    height: hp(7),
    borderRadius: 10000
   },
   txt: {
    fontSize: hp(5),
    textAlign: "center",
    top: hp(.2)
   },
   addcontent: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: wp(100),
    minHeight: hp(45),
    display: "flex",
    paddingHorizontal: wp(5),
    zIndex: 101,
   },
   
   addbtn: {
    backgroundColor: "#e0dddd",
    width: wp(20),
    height: wp(30),
    borderRadius: 10,
   },
   btnTop: {
    margin: "auto"
   },
   btnBottom: {
    margin: "auto"
   },
   addheader: {
    backgroundColor: "white",
    width: wp(100),
    top: -hp(30),
    height: hp(21),
    zIndex: 99,
    borderRadius: 20
    
   }
});