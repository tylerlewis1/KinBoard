
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
    paddingLeft: wp(2.5)
   },
   greeting: {
    fontSize: hp(6),
    fontWeight: "bold",
    padding: wp(3)
   },
   top: {
    height: hp(10)
   },
   main: {
    height: hp(75)
   }
});