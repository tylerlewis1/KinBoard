import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
export default function Circle({id, name, cover, style}) {
    const nav = useNavigation();
    const { width, height } = Dimensions.get("window");
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);
    return(
        <TouchableOpacity 
            style={style.btn}
            onPress={() => {
               router.navigate({
                    pathname: "/screens/circlescreens/circledash", 
                    params: { id, name, cover }
                });
            }}
        >
            <View style={{ height: hp(13)}}>
                {(cover == "" || cover == null) ? (
                    <Ionicons color={style.iconc} name="home" size={hp(10)} style={{textAlign: "center", marginTop: hp(3)}} />    
                ): (
                    <Image cachePolicy="disk" source={{uri: cover}} style={{width: hp(9), height: hp(9), display: "block",borderRadius: 100, margin: "auto"}}/>
                )}
            </View>
            <View>
                <Text style={style.txt}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}



