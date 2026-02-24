import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DateTimeModal({ event, setEvent, open, setOpen, style: parentStyle }) {
    const [type, setType] = useState("date");
    const [phase, setPhase] = useState(1);

    useEffect(() => {
        if (!open) {
            setType("date");
            setPhase(1);
        }
    }, [open]);

    const handleNext = () => {
        if (type === "date") {
            setType("time");
        } else if (type === "time" && phase === 1) {
            setEvent(prev => ({ ...prev, formattedDate: formatDate(event.date) }));
            setPhase(2);
            setType("date");
        } else {
            setEvent(prev => ({ ...prev, formattedEndDate: formatDate(event.endDate) }));
            setOpen(false);
        }
    };

    const onPickerChange = (e, selectedDate) => {
        if (!selectedDate) return;
        if (phase === 1) {
            setEvent(prev => ({ ...prev, date: selectedDate }));
        } else {
            setEvent(prev => ({ ...prev, endDate: selectedDate }));
        }
    };

    const formatDate = (input) => {
        if (!input) return "";
        const date = input.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const time = input.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
        return `${date} at ${time}`;
    };

    // Helper for Step Indicator
    const step = phase === 1 ? (type === "date" ? 1 : 2) : (type === "date" ? 3 : 4);

    return (
        <Modal visible={open} transparent animationType="slide">
            <Pressable style={localStyles.backdrop} onPress={() => setOpen(false)} />
            
            <View style={[localStyles.container, { backgroundColor: parentStyle.content.backgroundColor }]}>
                {/* Header & Progress Indicator */}
                <View style={localStyles.header}>
                    <Text style={[localStyles.phaseText]}>
                        {phase === 1 ? "Start Schedule" : "End Schedule"}
                    </Text>
                    <View style={localStyles.progressRow}>
                        {[1, 2, 3, 4].map((i) => (
                            <View 
                                key={i} 
                                style={[
                                    localStyles.dot, 
                                    { backgroundColor: i <= step ? parentStyle.active.backgroundColor : '#ccc' }
                                ]} 
                            />
                        ))}
                    </View>
                </View>

                {/* Instructional Text */}
                <Text style={localStyles.instruction}>
                    {type === "date" ? `Select ${phase === 1 ? 'Start' : 'End'} Day` : `Set ${phase === 1 ? 'Start' : 'End'} Time`}
                </Text>

                {/* The actual Picker */}
                <View style={localStyles.pickerContainer}>
                    <DateTimePicker
                        value={(phase === 1 ? event.date : event.endDate) || new Date()}
                        mode={type}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        textColor={parentStyle.txtc} // Important for Dark Mode
                    />
                </View>

                {/* Footer Actions */}
                <TouchableOpacity 
                    onPress={handleNext} 
                    style={[parentStyle.btn, parentStyle.active, localStyles.confirmBtn]}
                >
                    <Text style={parentStyle.btntxt}>
                        {step === 4 ? "Finalize Time" : "Next Step"}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setOpen(false)} style={localStyles.cancelBtn}>
                    <Text style={{ color: parentStyle.txtc, opacity: 0.5 }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const localStyles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    phaseText: {
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
        color: "#b7b5b5"
    },
    progressRow: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 25,
        height: 4,
        borderRadius: 2,
    },
    instruction: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color: "#b7b5b5"
    },
    pickerContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
    },
    confirmBtn: {
        marginTop: 20,
        width: '100%',
        paddingVertical: 15,
    },
    cancelBtn: {
        marginTop: 15,
    }
});