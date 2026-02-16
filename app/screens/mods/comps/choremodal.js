import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
export default function ChoreModal({colors, wp, hp, addChore}) {
    const style = useStyles(colors, wp, hp);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [chore, setChore] = useState({
        name: "",
        description: "",
        lastdone: null,
        lastdoneby: null,
        who: null,
    });
     const [items, setItems] = useState([
        { label: 'Do not repeat', value: null },
        { label: 'Dailey', value: 'Dailey' },
        { label: 'Every Other Day', value: 'Every Other Day' },
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Biweekly', value: 'Biweekly' },
        { label: 'Monthly', value: 'Monthly' },
        { label: '6 Months', value: '6 Months' },
        { label: 'Yearly', value: 'Yearly' },
    ]);
    return(
        <View style={style.content}>
            <Text style={style.txt}>Add a chore</Text>
            <View style={style.form}>
                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.offtxt}
                    placeholder="Chore"
                    onChangeText={(value) => setChore(prev => ({ ...prev, name: value }))}
                />
                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.offtxt}
                    placeholder="Assign to"
                    onChangeText={(value) => setChore(prev => ({ ...prev, who: value }))}
                /> 
                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.offtxt}
                    placeholder="Description (optional)"
                    onChangeText={(value) => setChore(prev => ({ ...prev, description: value }))}
                /> 
                 <DropDownPicker
                    open={open}
                    items={items}
                    setOpen={setOpen}
                    value={value}
                    placeholder="Do not repeat"
                    setValue={setValue}
                    setItems={setItems}
                    style={style.dropdown}
                    dropDownContainerStyle={style.dropdown}
                    textStyle={{color: colors.offtxt}}
                />
                <TouchableOpacity style={[style.btn, (!(chore.name != "")) ? style.inactive: style.active]} disabled={ (!(chore.name != ""))} onPress={() => {addChore(chore, value)}}>
                    <Text style={style.btntxt}>Add</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}
function useStyles(colors, wp, hp){

    return StyleSheet.create({
        content: {
            backgroundColor: colors.compbg,
            width: wp(80),
            margin: "auto",
            height: hp(40),
            padding: wp(5),
            borderRadius: 10
        },
        txt: {
            color: colors.txt,
            fontWeight: "300",
            fontSize: wp(8)
        },
        form: {
            margin: "auto",
            
        },
        input: {
            backgroundColor: colors.compbgl,
            padding: hp(1),
            borderRadius: 10,
            width: wp(70),
            marginBottom: hp(2),
            color: colors.txt
        },
        btn: {
            margin: "auto",
            padding: wp(3),
            borderRadius: 10,
            width: wp(70)
            
        },
        btntxt: {
            textAlign: "center",
            fontWeight: "bold"
        },
        active: {
            backgroundColor: colors.accent
        },
        inactive: {
            backgroundColor: "grey"
        },
        dropdown: {
            backgroundColor: colors.compbgl,
            padding: hp(1),
            borderRadius: 10,
            width: wp(70),
            marginBottom: hp(2),
            color: colors.txt,
            borderWidth: 0
        }
    });
} 