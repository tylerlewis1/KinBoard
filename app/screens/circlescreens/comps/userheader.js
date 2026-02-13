import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
export default function UserHeader({memberData, colors, hp, wp}) {
    const style = useStyles(colors, hp, wp);
    return(
        <View style={style.container}>
            {(memberData.pfp != "") ? (
                <Image source={{uri: memberData.pfp}} style={style.pfp} cachePolicy="disk"/>
            ):(
                <Image source={require("@/assets/images/dpfp.png")} style={style.pfp} cachePolicy="disk"/>
            )}
            
            
            <Text style={style.txt}>{memberData.name}</Text>
        </View>
    )
}
function useStyles(colors, hp, wp){
    return StyleSheet.create({
        container: {
            backgroundColor: colors.compbgl,
            height: hp(10),
            width: wp(90),
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            borderColor: colors.compbg,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)',
        },
        pfp: {
            width: hp(7),
            height: hp(7),
            borderRadius: 100,
            marginVertical: "auto",
            marginLeft: wp(2)
        }, txt: {
            marginVertical: "auto",
            marginLeft: wp(3),
            fontWeight: "300",
            fontSize: wp(9),
            color: colors.txt
        }
    });
}