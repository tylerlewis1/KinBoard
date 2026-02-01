import Ionicons from '@expo/vector-icons/Ionicons';
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../../../firebase";
import Circle from "./circle";
export default function HouseHolds({userdata, setModalVisible}){
    const [circles, setCircles] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(userdata);
    
    useEffect(() => {
        const getCircleData = async() =>{    
            setCircles([]);
            setLoading(true);
            userdata.circles.map(async (circle) => {
                try{
                    console.log(circle);
                    const circleRef = doc(db, "circles", String(circle));
                    const data = await getDoc(circleRef);
                    if(!data.exists()){
                        try{
                            const userDoc = doc(db, "users", auth.currentUser.uid);
                            console.log(circle);
                            await updateDoc(userDoc, {
                                circles: arrayRemove(circle)
                            });
                        } catch(e){
                            console.log(e);
                        }
                    return;
                    }
                    setCircles(prev => [...prev, data.data()]);
                }catch(e){
                    alert("Error getting circles");
                    console.log(e);
                    return(
                        <View>
                            <Text style={{color: "red"}}>Error: {e}</Text>
                        </View>
                    );
                }
                setLoading(false);
            });
        }
        getCircleData();
        setLoading(false);
    }, [userdata.circles]);
    if(loading){
        return(
            <View style={style.content}>
                <ActivityIndicator size="large" style={style.lodaing} />
                <Text style={{textAlign: "center", paddingTop: hp(2), fontWeight: "bold"}}>Loading...</Text>
            </View>
        )    
    }
    return(
        <View style={style.content}>
            <Text style={style.header}>Circles</Text>
            <ScrollView style={style.btnscroll} contentContainerStyle={style.gridContainer}>
               {circles.map((data) => {
                if(data == null){
                    return;
                }
                return( 
                    <Circle key={data?.id} name={data?.name} cover={data?.cover} id={data?.id}/>
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
    lodaing: {
        marginTop: hp(10)
    },
   content: {
    backgroundColor: "#e2e2e2",
    position: "absolute",
    width: wp(100),
    height: hp(90),
    padding: wp(5),
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
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