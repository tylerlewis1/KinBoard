import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { userContext } from "./background/Users";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
export default function Index() {
  const user = useContext(userContext);
  const Stack = createNativeStackNavigator();
  if(user.userData == null){
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    );
  } else {
    return(  
      <Stack.Navigator screenOptions={{headerShown: false}}>
        
      </Stack.Navigator>
    )
  }

}
