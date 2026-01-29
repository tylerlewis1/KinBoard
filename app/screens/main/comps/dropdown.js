import { Dimensions, StyleSheet, Text, View } from "react-native";
export default function DropDown() {
    return(
        <View style={style.container}>
            <Text style={style.txt}>Drop Down</Text>
        </View>
    )
}
const { width, height } = Dimensions.get("window");
const style = StyleSheet.create({
  
   container: {
    backgroundColor: "#e7e7e7",
    position: "absolute",
    left: ((width/2) - ((width/2)/2)),
    width: (width/2),
    padding: (width * .04),
    borderRadius: 20
   },
   txt: {
    textAlign: "center"
   }
});