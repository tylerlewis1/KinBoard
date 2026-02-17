import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
export default function Option({item, style, logic}) {
    const { width, height } = Dimensions.get("window");
    const hp = (percent) => height * (percent / 100);
    const renderRightActions = (progress, dragX, item) => {
        return (
            <TouchableOpacity 
                style={style.delbtn} 
                onPress={() => {
                    const newOptions = logic.options.filter(option => option.id !== item.id);
                    logic.setOptions(newOptions);
                }}
            >
                <Ionicons size={hp(2.5)} color="white" name="trash"/>
            </TouchableOpacity>
        );
    };
        
    return(
            <Swipeable 
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
            >
                <View style={[style.optionInput, {flexDirection: "row",}]}>
                    <View style={style.optionDot}/>
                    <Text style={style.optionInputText}>{item.txt}</Text>
                </View>
        </Swipeable>
    )
}