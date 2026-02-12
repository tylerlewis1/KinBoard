
import { Dimensions, StyleSheet } from "react-native";
import useAppColors from "../../background/Colors.js";
const { width, height } = Dimensions.get("window");


const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
export default function useStyles() {

const colors = useAppColors();

return StyleSheet.create({
   container: {
        backgroundColor: colors.background
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
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
    },
    name: {
        paddingLeft: wp(3),
        paddingTop: hp(2.8),
        fontSize: hp(2),
        color: colors.txt,
        fontWeight: 'bold'
    },
    back: {
        marginTop: hp(2.5),
        paddingHorizontal: wp(3)
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
    backgroundColor: colors.accent,
    width: hp(7),
    height: hp(7),
    borderRadius: 10000
   },
   txt: {
    fontSize: hp(5),
    textAlign: "center",
    top: hp(.2),
    color: colors.txt,
   },
   addcontent: {
    backgroundColor: colors.background,
    position: "absolute",
    bottom: 0,
    width: wp(100),
    minHeight: hp(45),
    display: "flex",
    paddingHorizontal: wp(5),
    zIndex: 101,
   },
   
   addbtn: {
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
    width: wp(100),
    top: -hp(30),
    height: hp(21),
    zIndex: 99,
    borderRadius: 20
   },
   iconc: colors.txt,
   colors: colors
});
}