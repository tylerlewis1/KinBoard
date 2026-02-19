import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Modal, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function DateTimeModal({event, setEvent, open, setOpen, style}){
    const [type, setType] = useState("date");
    const [phase, setPhase] = useState(1);
    useEffect(() => {
        if (!open) {
            setType("date")
            setPhase(1);
        };
    }, [open]);

    const handleNext = () => {
        if (type === "date") {
            setType("time");
            return;
        } if(type == "time" && phase == 1) {
            setEvent(prev => ({ ...prev, formattedDate: formatDate(event.date)}));
            setPhase(2);
            setType("date");
            return;
        }else {
            setEvent(prev => ({ ...prev, formattedEndDate: formatDate(event.endDate)}));
            setOpen(false); 
        }
    };

    const onPickerChange = (e, selectedDate) => {
        if (selectedDate && phase == 1) {
            setEvent(prev => ({ ...prev, date: selectedDate }));
            return;
        } else if(selectedDate){
            setEvent(prev => ({ ...prev, endDate: selectedDate }));
            return;
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
    }

    return(
        <Modal
            visible={open}
            transparent={true}
            animationType="fade"
        >
            <Pressable style={style.backdrop} onPress={() => setOpen(false)} />
            <View style={style.date}>
                
                {/* Mode Title to guide the user */}
                {(phase == 1)? (
                    <>
                        <Text style={{ fontWeight: 'bold', color: style.txtc, padding: 15}}>
                            {type === "date" ? "Select Start Date" : "Select Start Time"}
                        </Text>
                        <DateTimePicker
                            value={event.date || new Date()} 
                            mode={type} 
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onPickerChange}
                        />
                    </>
                ):(
                    <>
                        <Text style={{ fontWeight: 'bold', color: style.txtc, padding: 15}}>
                            {type === "date" ? "Select End Date" : "Select End Time"}
                        </Text>    
                        <DateTimePicker
                            value={event.endDate || new Date()} 
                            mode={type} 
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onPickerChange}
                        />
                    </>
                )}

                <TouchableOpacity 
                    onPress={handleNext} 
                    style={[style.btn, style.active, {marginBottom: 10}]}
                >
                    <Text style={style.btntxt}>{type === "date" ? "Next: Set Time" : "Confirm"}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}