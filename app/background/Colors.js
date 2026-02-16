import { useColorScheme } from "react-native";

export const Colors = {
    dark: {
        accent: "#2EC4B6",
        txt: "white",
        background: "#1f1e1e",
        compbg: "#252424",
        compbgl: "#302f2f",
        compbgd: "#131212",
        offtxt: "#bfbbbb"
    },
    light: {
        accent: "#2EC4B6",
        txt: "black",
        background: "#f0eeee",
        compbg: "#d9d6d6",
        compbgl: "#e7e4e4",
        compbgd: "rgb(202, 199, 199)",
        offtxt: "#bfbbbb"
    }
};

export default function useAppColors() {
    const theme = useColorScheme(); 
    return theme === "dark" ? Colors.dark : Colors.light;
}