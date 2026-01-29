import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function HouseHolds(){
    return(
        <View style={style.content}>
            <Text style={style.header}>House Holds</Text>
            <ScrollView >
                <TouchableOpacity style={style.btn}>
                    <Ionicons name="add" size={hp(10)} style={{textAlign: "center", marginTop: hp(3)}} />
                    <Text style={style.txt}>Add Circle</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
  
   content: {
    backgroundColor: "#e2e2e2",
    position: "absolute",
    width: wp(100),
    height: hp(90),
    padding: wp(5),
   },
   txt: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: hp(1.5),
    fontSize: wp(5)
   },
   header: {
    fontSize: hp(4),
    fontWeight: "bold",
    paddingBottom: hp(2)
   },
   btn: {
    backgroundColor: "#f0eeee",
    width: wp(30),
    height: hp(20),
    borderRadius: 20
   }
});