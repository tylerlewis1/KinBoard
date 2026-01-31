import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from 'react-native-qrcode-svg';
export default function Content({selection, circleData}) {
    if(selection == "home"){
        return(
            <ScrollView style={style.container}>
                <Text>home</Text>
            </ScrollView>
        )
    }
    if(selection == "add"){
        return(
            <View style={style.container}>
                <Text style={style.title}>Add user to the circle</Text>
                 <View style={style.qr}>
                {(circleData?.id)? (
                    <QRCode
                        value={String(circleData.id)}
                        size={wp(50)} 
                        color="black" 
                        backgroundColor="white"
                        logo={require("../../../../assets/images/logoz.png")}
                    />
                ): (
                    <></>
                )}
                <Text style={{padding: hp(1)}}>Scan QR code in the app</Text>
                </View>
                <Text style={style.code}>Invite Code: <Text style={{fontWeight: "bold"}}>{circleData?.id}</Text></Text>
            </View>
        )
    }
    
    
    return(
        <ScrollView style={style.container}>
             
        </ScrollView>
    );
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
    container: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)',
        width: wp(90),
        height: hp(70),
        backgroundColor: "#dfdede",
        borderRadius: 10,
        marginTop: hp(2),
        left: wp(5)
    }, 
    title: {
        textAlign: "center",
        fontSize: wp(6),
        fontWeight: "bold",
        padding: hp(3.5)
    }, 
    code: {
        fontSize: wp(5),
        textAlign:"center",
        padding: hp(5)
    },
    qr: {
        padding: wp(5),
        width: wp(60),
        left: wp(15),
        backgroundColor: "white",
        borderRadius: 20

    }

});