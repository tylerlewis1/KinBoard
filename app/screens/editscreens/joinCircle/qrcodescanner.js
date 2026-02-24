import useAppColors from "@/app/background/Colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

export default function QrCodeScanner({ setCode }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const colors = useAppColors();

    // 1. Handle Permission States
    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={{ color: colors.txt, marginBottom: 10 }}>Camera access is required</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.permBtn}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Enable Camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = ({ data }) => {
        if (scanned) return; // Prevent multiple scans
        setScanned(true);
        setCode(data);
        
        // Reset scanner after 2 seconds so user can try again if it was wrong
        setTimeout(() => setScanned(false), 2000);
    };

    return (
        <View style={styles.container}>
            {/* The Wrapper handles the border radius */}
            <View style={styles.cameraWrapper}>
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
                
                {/* Visual Overlay to show scanning area */}
                <View style={styles.overlay}>
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    centered: {
        height: width * 0.8,
        width: width * 0.8,
    },
    cameraWrapper: {
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: 30, // Now this will work
        overflow: "hidden",
        backgroundColor: "#000",
        position: 'relative'
    },
    permBtn: {
        backgroundColor: "#2EC4B6",
        padding: 12,
        borderRadius: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 50,
        borderColor: '#2EC4B6',
        borderWidth: 4,
    },
    topLeft: { top: 40, left: 40, borderRightWidth: 0, borderBottomWidth: 0 },
    topRight: { top: 40, right: 40, borderLeftWidth: 0, borderBottomWidth: 0 },
    bottomLeft: { bottom: 40, left: 40, borderRightWidth: 0, borderTopWidth: 0 },
    bottomRight: { bottom: 40, right: 40, borderLeftWidth: 0, borderTopWidth: 0 },
});