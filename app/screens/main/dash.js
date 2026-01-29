import { userContext } from "@/app/background/Users";
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../styles/main/dash";
import HouseHolds from "./comps/households";
export default function Dash() {
    const nav = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { width, height } = Dimensions.get("window");
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);
    const user = useContext(userContext);
    return(
        <SafeAreaView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={style.modal} onPress={() => setModalVisible(false)}>
                    </Pressable>
                    <View style={style.modalcontent} >
                        <TouchableOpacity onPress={() => {setModalVisible(false)}} style={{padding: 10}}><Text>Back</Text></TouchableOpacity>
                        <View style={style.form}>
                            <Text style={style.title}>Create new circle</Text>
                            <TextInput placeholder="Name" style={style.input}/>

                            <TouchableOpacity 
                                        style={style.button}
                                        ><Text style={style.buttontxt}>Create Circle</Text></TouchableOpacity>
                        </View>

                    </View>
                

            </Modal>
            <View style={style.header}>
            </View>
            <View style={style.content}>
                <View style={style.top}>
                    <Text style={style.greeting}>Hi <Text style={{color: "#2EC4B6"}}>{user.userData.name}!</Text></Text>
                     
                    <TouchableOpacity 
                        onPress={() => {nav.navigate("Account")}}
                        style={style.settings}
                    >      
                        <Entypo name="cog" size={hp(4.5)} />
                    </TouchableOpacity>
                </View>
                <View style={style.main}>
                    <HouseHolds userdata={user.userData} setModalVisible={setModalVisible}/>
                </View>
            </View>
        </SafeAreaView>
    );
}