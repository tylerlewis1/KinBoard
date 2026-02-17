import { Ionicons } from "@expo/vector-icons";
import { FlatList, KeyboardAvoidingView, Modal, Pressable, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import Option from "./optionItem";
export default function AnnouncementModal({style, hp, logic}) {

return (
    <Modal
        visible={logic.modalVis}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
                logic.setModalVis(false);
                logic.setMsg("");
                logic.setQuestion("");
                logic.setOptions([]);
                logic.setOption("");
                }}
            >
                <Pressable 
                    style={style.modalOverlay} 
                    onPress={() => {
                        logic.setModalVis(false);
                        logic.setMsg("");
                        logic.setQuestion("");
                        logic.setOptions([]);
                        logic.setOption("");
                    }}
                />
                
                <KeyboardAvoidingView 
                    behavior="position"
                    keyboardVerticalOffset={-hp(25)}
                    style={style.keyboardView}
                >
                    <View style={style.modal}>
                        {/* Modal Header */}
                        <View style={style.modalHeader}>
                            <TouchableOpacity 
                                onPress={() => {
                                    logic.setModalVis(false);
                                    logic.setMsg("");
                                    logic.setQuestion("");
                                    logic.setOptions([]);
                                    logic.setOption("");
                                }} 
                                style={style.closeBtn}
                            >
                                <Ionicons name="close" size={hp(3)} color="#666"/>
                            </TouchableOpacity>
                            
                
                            
                            <View style={style.switchContainer}>
                                <Text style={[style.switchLabel, !logic.type && style.switchLabelActive]}>Post</Text>
                                <Switch
                                    trackColor={{ false: '#E0E0E0', true: '#2EC4B6' }}
                                    thumbColor='#FFFFFF'
                                    onValueChange={logic.setType}
                                    value={logic.type}
                                    style={style.switch}
                                />
                                <Text style={[style.switchLabel, logic.type && style.switchLabelActive]}>Poll</Text>
                            </View>
                        </View>
                        
                        {/* Modal Content */}
                        <View style={style.modalContent}>
                            {!logic.type ? (
                                <>
                                    <TextInput
                                        placeholder='What would you like to announce?'
                                        placeholderTextColor="#999"
                                        multiline={true}
                                        onChangeText={logic.setMsg}
                                        style={style.msgbox}
                                    />
                                    <TouchableOpacity 
                                        style={[style.sendBtn, logic.msg === "" && style.sendBtnDisabled]} 
                                        onPress={() =>{logic.send()}}
                                        disabled={logic.msg === ""}
                                    >
                                        <Text style={style.sendBtnText}>Post Announcement</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TextInput
                                        placeholder='Ask a question...'
                                        placeholderTextColor="#999"
                                        onChangeText={logic.setQuestion}
                                        value={logic.question}
                                        style={style.questionBox}
                                    />
                                    
                                    <View style={style.addOptionContainer}>
                                        <TextInput
                                            placeholder='Add an option'
                                            placeholderTextColor="#999"
                                            value={logic.option}
                                            onChangeText={logic.setOption}
                                            style={style.optionInput}
                                        />
                                        <TouchableOpacity
                                            style={[style.addOptionBtn, logic.option === "" && style.addOptionBtnDisabled]}
                                            disabled={logic.option === ""}
                                            onPress={() => {
                                                if(logic.option.trim()) {
                                                    logic.setOptions(prev => [...prev, {
                                                        id: Math.random(),
                                                        txt: logic.option,
                                                        votes: 0
                                                    }]);
                                                    logic.setOption("");
                                                }
                                            }}
                                        >
                                            <Ionicons name="add" size={hp(2.5)} color="#FFFFFF"/>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    {logic.options.length > 0 && (
                                        <View style={style.optionsList}>
                                            <Text style={style.optionsListTitle}>Options ({logic.options.length})</Text>
                                            <FlatList 
                                                data={logic.options}
                                                renderItem={({ item }) => <Option item={item} style={style} logic={logic} />}
                                                keyExtractor={item => String(item.id)}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>
                                    )}
                                    
                                    <TouchableOpacity 
                                        style={[style.sendBtn, (logic.question === "" || logic.options.length < 2) && style.sendBtnDisabled]} 
                                        onPress={() =>{logic.send()}}
                                        disabled={logic.question === "" || logic.options.length < 2}
                                    >
                                        <Text style={style.sendBtnText}>Create Poll</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
  );
}
