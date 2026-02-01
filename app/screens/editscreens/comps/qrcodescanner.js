import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect } from "react";
import { Dimensions, Platform, StatusBar, StyleSheet, View } from "react-native";


export default function QrCodeScanner({setCode}) {
    const [permission, requestPermission] = useCameraPermissions();
    const isPermissionGranted = Boolean(permission?.granted);
    useEffect(()=>{
        try{    
            if(isPermissionGranted){
                requestPermission();
            }
        }catch(e){
            alert("camera perms needed to use qr code scanner");
        }
        
    }, [])
    return (
        <View style={styleSheet.container}>

            {Platform.OS === "android" ? <StatusBar hidden /> : null}
            {(isPermissionGranted)? (
                <CameraView
                    style={styleSheet.camStyle}
                    facing="back"
                    barcodeScannerSettings={
                        {
                            barcodeTypes: 'qr',
                        }
                    }
                    onBarcodeScanned={
                        ({ data }) => {
                            setCode(data);// here you can get your barcode id or url
                        }
                    }
            />

            ): (<></>)}
            
        </View>
    );

}
const { width, height } = Dimensions.get("window");
const wp = (percent) => width * (percent / 100);
const hp = (percent) => height * (percent / 100);
const styleSheet = StyleSheet.create({
    container: {
        top: hp(5),
    },
    camStyle: {
        width: wp(80),
        height: wp(80),
        left: wp(10),
        borderRadius: 10
        
    }
});
