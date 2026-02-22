import useAppColors from "@/app/background/Colors";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() {
  const styles = useStyle();
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(10);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  useEffect(() => {
    // Animate logo in first
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withTiming(1, { duration: 800 });

    // Animate text after small delay
    setTimeout(() => {
      textOpacity.value = withTiming(1, { duration: 600 });
      textTranslateY.value = withTiming(0, { duration: 600 });
    }, 500);
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <Animated.Image
          source={require("../../../assets/images/logotb.png")}
          style={[styles.img, logoStyle]}
          resizeMode="contain"
        />
      </SafeAreaView>
  );
}
function useStyle() {
  const colors = useAppColors();
  return StyleSheet.create({
    container: {
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background
    },
    img: {
      width: "80%",
      height: "80%",
    },
  });
}