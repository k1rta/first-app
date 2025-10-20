import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./MainScreen";
import SecondaryScreen from "./SecondaryScreen";
import { Ionicons } from "@expo/vector-icons";

export type HomeTabParamList = {
  Main: undefined;
  Secondary: undefined;
};

const BottomTab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeScreen() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen 
        name="Main" 
        component={MainScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen 
        name="Secondary" 
        component={SecondaryScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
