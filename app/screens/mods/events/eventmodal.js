import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimeModal from './datetimemodal';
export default function EventModal({colors, wp, hp, addEvent}) {
    const style = useStyles(colors, wp, hp);
    const [open, setOpen] = useState(false)
    const [event, setEvent] = useState({
        name: "",
        phone: "",
        description: "",
        date: (new Date()),
        formattedDate: null,
        endDate: (new Date()),
        formattedEndDate: null,
        location: ""
    })
    return(
        <View style={style.content}>
            <Text style={[style.txt, {paddingBottom: 10}]}>Add a event</Text>
            <View style={style.form}>
                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.txt}
                    placeholder="Name"
                    onChangeText={(value) => setEvent(prev => ({ ...prev, name: value }))}
                />
                <TouchableOpacity style={[style.active, style.btn, {marginBottom: hp(2)}]}
                    onPress={() => setOpen(!open)}
                >
                    <Text style={style.btntxt}>{event.formattedDate? `${event.formattedDate} to ${event.formattedEndDate}`:"Set Time"}</Text>
                </TouchableOpacity>
                    
                <DateTimeModal event={event} open={open} setOpen={setOpen} style={style} setEvent={setEvent}/>

                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.txt}
                    placeholder="Description (optional)"
                    onChangeText={(value) => setEvent(prev => ({ ...prev, description: value }))}
                /> 
                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.txt}
                    placeholder="Location (optional)"
                    onChangeText={(value) => setEvent(prev => ({ ...prev, location: value }))}
                /> 
                <TouchableOpacity style={[style.btn, (!(event.name != "") || !(event.date)) ? style.inactive: style.active]} disabled={ (!(event.name != "") || !(event.date))} onPress={() => {addEvent(event)}}>
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
            top: hp(30),
            padding: wp(5),
            borderRadius: 10,
        },
        txt: {
            color: colors.txt,
            fontWeight: "300",
            fontSize: wp(8),
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
        date:{ 
            margin: "auto",
            width: "max",
            backgroundColor: colors.compbgl
            
        },
        backdrop: {
            width: wp(100),
            height: hp(100),
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        txtc: colors.txt
    });
} 