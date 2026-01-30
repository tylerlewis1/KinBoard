
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);

export default StyleSheet.create({
   container: {
   
    },
    header: {
        display: "flex",
        flexDirection: "row"
    },
    img: {
        width: hp(8),
        height: hp(8),
        borderRadius: 100
    },
    name: {

    }
});