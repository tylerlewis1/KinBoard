import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { userContext } from "./background/Users";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
import Dash from "./screens/main/dash";
import Loading from "./screens/other/Loading";
export default function Index() {
  const [init, setInit] = useState(true);
  const user = useContext(userContext);
  const Stack = createNativeStackNavigator();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => setInit(false));
      }, 2000);
  }, []);


 if (init) {
    return (
      <Animated.View style={{ flex: 1, opacity }}>
        <Loading />
      </Animated.View>
    );
  }

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
          <Stack.Screen name="Dash" component={Dash}/>
      </Stack.Navigator>
    )
  }

}
