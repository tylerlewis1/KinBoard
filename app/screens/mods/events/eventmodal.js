import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimeModal from "./datetimemodal";
export default function EventModal({ colors, wp, hp, addEvent }) {
    const style = useStyles(colors, wp, hp);
    const [open, setOpen] = useState(false);
    const [event, setEvent] = useState({
        name: "",
        phone: "",
        description: "",
        date: new Date(),
        formattedDate: null,
        endDate: new Date(),
        formattedEndDate: null,
        location: ""
    });

    const isReady = event.name.trim() !== "" && event.formattedDate;

    return (
        <View style={style.content}>
            <View style={style.handle} />
            
            <Text style={style.title}>New Event</Text>
            
            <View style={style.form}>
                <Text style={style.label}>EVENT NAME</Text>
                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.txt + "80"} // Semi-transparent
                    placeholder="E.g. Family Dinner"
                    placeholderTextColor={colors.offtxt}
                    onChangeText={(value) => setEvent(prev => ({ ...prev, name: value }))}
                />

                <Text style={style.label}>SCHEDULE</Text>
                <TouchableOpacity 
                    style={[style.timeBtn, event.formattedDate ? style.active : style.inactiveBtn]}
                    onPress={() => setOpen(!open)}
                >
                    <Text style={[style.btntxt, { color: event.formattedDate ? '#FFF' : colors.txt }]}>
                        {event.formattedDate ? `${event.formattedDate} → ${event.formattedEndDate}` : "Select Date & Time"}
                    </Text>
                </TouchableOpacity>
                    
    
                <DateTimeModal event={event} open={open} setOpen={setOpen} style={style} setEvent={setEvent}/> 

                <Text style={style.label}>DETAILS (OPTIONAL)</Text>
                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.offtxt}
                    placeholder="Description"
                    onChangeText={(value) => setEvent(prev => ({ ...prev, description: value }))}
                /> 
                <TextInput
                    style={style.input}
                    placeholderTextColor={colors.offtxt}
                    placeholder="Location"
                    onChangeText={(value) => setEvent(prev => ({ ...prev, location: value }))}
                /> 

                <TouchableOpacity 
                    style={[style.submitBtn, !isReady ? style.disabled : style.active]} 
                    disabled={!isReady} 
                    onPress={() => addEvent(event)}
                >
                    <Text style={style.submitBtnTxt}>Create Event</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function useStyles(colors, wp, hp) {
    return StyleSheet.create({
        content: {
            backgroundColor: colors.compbg,
            width: wp(90),
            alignSelf: "center",
            top: hp(20),
            padding: wp(6),
            borderRadius: 25,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 20,
            elevation: 10,
        },
        handle: {
            width: 40,
            height: 5,
            backgroundColor: colors.offtxt,
            borderRadius: 10,
            alignSelf: 'center',
            marginBottom: 15
        },
        title: {
            color: colors.txt,
            fontWeight: "800",
            fontSize: wp(7),
            marginBottom: hp(2),
        },
        label: {
            fontSize: wp(3),
            fontWeight: "700",
            marginBottom: 5,
            letterSpacing: 1,
            color: colors.offtxt
        },
        form: {
            width: '100%',
        },
        input: {
            backgroundColor: colors.compbgl || "#f0f0f0",
            padding: hp(1.8),
            borderRadius: 15,
            width: "100%",
            marginBottom: hp(2.5),
            color: colors.txt,
            fontSize: 16,
        },
        timeBtn: {
            padding: hp(1.8),
            borderRadius: 15,
            width: "100%",
            marginBottom: hp(2.5),
            borderWidth: 1,
            borderColor: colors.accent + "40",
            justifyContent: 'center'
        },
        submitBtn: {
            marginTop: hp(1),
            padding: hp(2),
            borderRadius: 15,
            width: "100%",
            shadowColor: colors.accent,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        btntxt: {
            textAlign: "center",
            fontWeight: "600",
            color: colors.txt
        },
        submitBtnTxt: {
            textAlign: "center",
            fontWeight: "bold",
            color: "#FFF",
            fontSize: 18
        },
        active: {
            backgroundColor: colors.accent
        },
        inactiveBtn: {
            backgroundColor: colors.compbgl,
            borderColor: 'transparent'
        },
        disabled: {
            backgroundColor: "#A9A9A9",
            shadowOpacity: 0
        }
    });
}