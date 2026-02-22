import { functions } from "@/firebase";
import { useNavigation } from "expo-router";
import { httpsCallable } from "firebase/functions";

export default function useSettings(){
    const nav = useNavigation();
    const removeUser = async (uid, cid) =>{
        const removeUser = httpsCallable(functions, 'removeUser');
        await removeUser({uid: uid, cid: cid});
        nav.goBack();
        return;
    }
    return{
        removeUser
    }
}