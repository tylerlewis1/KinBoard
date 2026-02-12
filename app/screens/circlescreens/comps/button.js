import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
export default function Btn({ data, colors}) {
    
    const style = StyleSheet.create({
        pillContainer: {
            backgroundColor: colors.compbgl, // iOS Secondary System Background
            width: wp(90),  
            margin: "auto",    
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)',       
            height: hp(9),
            borderRadius: 40,          // Complete pill shape
            flexDirection: "row",      // Horizontal layout
            alignItems: "center",
            paddingHorizontal: wp(4),
            alignSelf: 'center',
            // Modern subtle border instead of heavy shadow
            borderWidth: 1,
            borderColor: colors.compbg,
        },
        iconCircle: {
            width: hp(6),
            height: hp(6),
            borderRadius: hp(3),
            backgroundColor: colors.compbg, // Slightly lighter circle for the icon
            justifyContent: "center",
            alignItems: "center",
        },
        textContainer: {
            marginLeft: wp(4),
            flex: 1,
        },
        buttonText: {
            color: colors.txt,
            fontSize: hp(2),
            fontWeight: "600",
            textTransform: "capitalize",
        },
        subText: {
            color: "#8E8E93",
            fontSize: hp(1.4),
            marginTop: 2,
        },
        arrow: {
            marginRight: wp(2),
        }
    });
    
    const getIconDetails = () => {
        const size = hp(3.5);
        const color = colors.txt;
        
        if (data.type.startsWith("chores")) {
            return { component: <MaterialIcons size={size} color={color} name="check-circle-outline" /> };
        } else if (data.type.startsWith("list")) {
            return { component: <Entypo size={size} color={color} name="list" /> };
        } else if (data.type.startsWith("events")) {
            return { component: <Ionicons size={size} color={color} name="calendar-outline" /> };
        } else if (data.type.startsWith("contacts")) {
            return { component: <MaterialIcons size={size} color={color} name="people-outline" /> };
        } else if (data.type.startsWith("savings goal")) {
            return { component: <FontAwesome5 size={size} color={color} name="piggy-bank" /> };
        }
        return { component: <Ionicons size={size} color={color} name="ellipsis-horizontal" /> };
    };

    const icon = getIconDetails().component;

    return (
        <View style={style.pillContainer} activeOpacity={0.8}>
            <View style={style.iconCircle}>
                {icon}
            </View>
            <View style={style.textContainer}>
                <Text style={style.buttonText}>
                    {data.name ? data.name : "No name"}
                </Text>
                <Text style={style.subText}>{(data.type.substr(data.type.length -1) == "!")? (`Add a ${data.name.toLowerCase()} to your page`): ("View details")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#444" style={style.arrow} />
        </View>
    );
}

