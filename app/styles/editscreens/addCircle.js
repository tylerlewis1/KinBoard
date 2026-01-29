
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);

export default StyleSheet.create({
   
    container: {

   },
   top: {
    display: "flex",
    flexDirection: "row",
    width: wp(100)
   },
   txt: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    padding: hp(1)
   },
   btn: {
    width: wp(80),
    padding: 15,
    display: "block",
    margin: "auto",
    marginTop: hp(2),
    borderRadius: 20,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
   },
   btntxt: {
    fontSize: wp(5),
    textAlign: "center"
   },
   
    
});