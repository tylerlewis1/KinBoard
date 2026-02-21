import { httpsCallable } from "firebase/functions";
import { functions } from "../../../../firebase";
export default function useChat(){
    const sendNotification = async(msg, circleId, senderId) => {
        const sendNotification = httpsCallable(functions, 'sendAnnouncmentNotification');
        sendNotification({ id: circleId, title: msg.senderName, msg: msg.text, sender: msg.senderId});
    }
    return{
        sendNotification
    }
}