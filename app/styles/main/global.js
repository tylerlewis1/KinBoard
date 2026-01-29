
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);

export default StyleSheet.create({
   container: {

   },
   pfp: {
    borderRadius: 1000,
    width: wp(50),
    height: wp(50),
    display: "block",
    margin: "auto",
    marginTop: 50,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
   }, 
   name: {
    fontSize: wp(5),
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20
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
   container: {
      height: "80%"
   }
    
});