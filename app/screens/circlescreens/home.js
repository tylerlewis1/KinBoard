import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Announcments from "./comps/announcments";
export default function Home({circleData}) {
    
    return(
        <ScrollView style={style.continer}>
            <View style={style.top}>
                <Text style={style.header}>{circleData?.name}</Text>
            </View>
            <View style={style.content}>
                <Announcments circleData={circleData}/>
            </View>
        </ScrollView>
    );
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    continer: {
        
    },
    top: {
        height: hp(10),
        padding: hp(1)
    },
    header: {
        fontSize: hp(6),
        fontWeight: "200"
    },
    announcments: {
        
    }
});