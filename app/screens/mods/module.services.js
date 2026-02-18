import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

export function useModuleServices(id, user, circleID, page, type) {
    const [data, setData] = useState(null);

    const modRef = doc(db, "circles", String(circleID), page, user, type, id);
    const pointerRef = doc(db, "circles", String(circleID), page, user);

    //get module data
    useEffect(() => {
        const unsubscribe = onSnapshot(modRef, (snapshot) => {
            setData(snapshot.data());
        }, (e) => {
            console.error("Listener failed: ", e);
        });
        return unsubscribe;
            
    }, [modRef]);
    
    const add = async(payload) => {
        try{
            await updateDoc(modRef, {
                data: arrayUnion(payload)
            })    
        }catch(e){
            console.log(e);
            alert("error");
        }
    }
    const remove = async(item) => {
        try{
            await updateDoc(modRef, {
                data: arrayRemove(item)
            })
        }catch(e){
            console.log(e);
            alert("error");
        }
    }
    const update = async() => {
        try{
            await updateDoc(modRef, {
                data: data.data
            });
        }catch(e){
            console.log(e);
            alert("error");
        }
    }


        return{
            data,
            setData,
            add,
            remove,
            update
        }
}