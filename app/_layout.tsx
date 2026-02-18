import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import UserProvider from "./background/Users";
export default function RootLayout() {
  
  return (
      <GestureHandlerRootView>
        <UserProvider>
          <Stack screenOptions={{headerShown: false}}/>
        </UserProvider>
      </GestureHandlerRootView>
  )
}
