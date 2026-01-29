import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../../../firebase";
import Circle from "./circle";
export default function HouseHolds({userdata, setModalVisible}){
    const [circles, setCircles] = useState([]);
    
    console.log(userdata);
    
    useEffect(() => {
        const getCircleData = async() =>{    
            setCircles([]);
            userdata.circles.map(async (circle) => {
                try{
                    console.log(circle);
                    const circleRef = doc(db, "circles", circle);
                    const data = await getDoc(circleRef);
                    setCircles(prev => [...prev, data.data()]);
                }catch(e){
                    alert("Error getting circles");
                    console.log(e);
                }
            });
        }
        getCircleData();
    }, []);
    
    return(
        <View style={style.content}>
            <Text style={style.header}>Circles</Text>
            <ScrollView style={style.btnscroll} contentContainerStyle={style.gridContainer}>
               {circles.map((data) => {
                return(
                    <Circle key={data.name} name={data.name}/>
                )
               })}
                <TouchableOpacity style={style.btn} onPress={() => {setModalVisible(true)}}>
                    <Ionicons name="add" size={hp(10)} style={{textAlign: "center", marginTop: hp(3)}} />
                    <Text style={style.txt}>Add Circle</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const style = StyleSheet.create({
  
   content: {
    backgroundColor: "#e2e2e2",
    position: "absolute",
    width: wp(100),
    height: hp(90),
    padding: wp(5),
   },
   txt: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: hp(1.5),
    fontSize: wp(4)
   },
   header: {
    fontSize: hp(4),
    fontWeight: "bold",
    paddingBottom: hp(2)
   },
   btn: {
    backgroundColor: "#f0eeee",
    width: wp(25),
    height: hp(20),
    borderRadius: 20,
   },
   btnscroll: {
    display: "flex",
    flexBasis: "50%",
    flexWrap: "wrap",
    width: wp(90),
   },
   gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp(6), 
        justifyContent: 'flex-start',
    },
});