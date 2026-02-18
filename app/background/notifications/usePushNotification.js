import registerNNPushToken, { registerIndieID, unregisterIndieDevice } from 'native-notify';
import { useState } from 'react';
export default function usePushNotifications() {
    const [devReg, setDevReg] = useState(false);
    registerNNPushToken(33378, '86zR9yj97uLD0H88J1J2VJ');
    const registerDeivce = async(uid) => {
        if(devReg) return;
        registerIndieID(String(uid), 33378, '86zR9yj97uLD0H88J1J2VJ');
        setDevReg(true);
        return;
    };
    const unregisterDeivce = async(uid) => {
        await unregisterIndieDevice(String(uid), 33378, '86zR9yj97uLD0H88J1J2VJ');
        setDevReg(false)
        return;
    };
    return{
        registerDeivce,
        unregisterDeivce
    }
}