import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from "./account";
import Dash from "./dash";
const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <>
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Home" 
        component={Dash}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" size={size} color={color}  />
          ),
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={Account}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" size={size} color={color}  />
          ),
        }}
      />
       
     
    </Tab.Navigator>
    </>
  );
}