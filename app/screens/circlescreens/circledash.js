import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebase";
import style from "../../styles/circle/circledash";
export default function CircleDash(){
    const { id, name, cover } = useLocalSearchParams(); 
    const nav = useNavigation();
    const [circleData, setCircleData] = useState();
    useEffect(() => {
        const getCircleData = async() =>{
            try{
                const circleDoc = doc(db, "circles", String(id));
                const req = await getDoc(circleDoc);
                setCircleData(req.data());
            }catch(e){
                console.log(e);
                alert("There was a error getting your circle")
            }
        }
        getCircleData();
    }, []);
    



    return(
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.header}>
                <Image style={style.img} source={{uri: circleData?.cover}}/>   
                <Text style={style.name}>{name}</Text>
                </View>    
                
            
            
            </View>
        </SafeAreaView>
    )
}