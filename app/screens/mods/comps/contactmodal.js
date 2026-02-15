import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function ContactModal({colors, wp, hp, addContact}) {
    const style = useStyles(colors, wp, hp);
    const [contact, setContact] = useState({
        name: "",
        phone: "",
        description: ""
    })
    return(
        <View style={style.content}>
            <Text style={style.txt}>Add a contact</Text>
            <View style={style.form}>
                <TextInput
                    style={style.input}
                    placeholder="Name"
                    onChangeText={(value) => setContact({name: value, phone: contact.phone, description: contact.description})}
                />
                <TextInput
                    style={style.input}
                    placeholder="Phone Number"
                    onChangeText={(value) => setContact({name: contact.name, phone: value, description: contact.description})}
                /> 
                <TextInput
                    style={style.input}
                    placeholder="Description (optional)"
                    onChangeText={(value) => setContact({name: contact.name, phone: contact.phone, description: value})}
                /> 
                <TouchableOpacity style={[style.btn, (!(contact.name != "") || !(contact.phone != "")) ? style.inactive: style.active]} disabled={ (!(contact.name != "") || !(contact.phone != ""))} onPress={() => {addContact(contact)}}>
                    <Text style={style.btntxt}>Add</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}
function useStyles(colors, wp, hp){

    return StyleSheet.create({
        content: {
            backgroundColor: colors.background,
            width: wp(80),
            margin: "auto",
            height: hp(35),
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
            marginBottom: hp(2)
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
        }
    });
} 