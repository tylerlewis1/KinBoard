import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../../firebase";
import style from "../../styles/circle/circledash";
import Content from "./comps/content";
import NavBar from "./comps/navbar";
export default function CircleDash(){
    const { id, name, cover } = useLocalSearchParams(); 
    const nav = useNavigation();
    const [circleData, setCircleData] = useState();
    const [isOwner, setIsOwner] = useState(false);
    const [selection, setSelection] = useState("home");
    const { width, height } = Dimensions.get("window");
    const wp = (percent) => width * (percent / 100);
    const hp = (percent) => height * (percent / 100);
    useEffect(() => {
        const getCircleData = async() =>{
            try{
                const circleDoc = doc(db, "circles", String(id));
                const req = await getDoc(circleDoc);
                setCircleData(req.data());
                if(req.data().owner == auth.currentUser.uid){
                    setIsOwner(true);
                }
            }catch(e){
                console.log(e);
                alert("There was a error getting your circle");
                nav.goBack();
            }
        }
        getCircleData();
    }, []);

    return(
        <SafeAreaView>
            <View style={style.container}>
                
                <View style={style.header}>
                    <TouchableOpacity onPress={() => {nav.goBack()}}>
                        <Ionicons name="arrow-back" size={hp(2.5)} style={style.back} />
                    </TouchableOpacity>
                    {(circleData?.cover == "")? (
                        <Image style={style.img} source={{uri: circleData?.cover}}/>   
                    ):(
                        <View style={{paddingBottom: hp(6)}}></View>
                    )}
                        
                    
                    <Text style={style.name}>{name}</Text>
                    <TouchableOpacity 
                        style={style.settings}
                    >      
                        <Entypo name="cog" size={hp(4.5)} />
                    </TouchableOpacity>
                </View>    
                <NavBar selection={selection} setSelection={setSelection} circleData={circleData}/>
                <Content selection={selection} circleData={circleData}/>
            </View>
        </SafeAreaView>
    )
}