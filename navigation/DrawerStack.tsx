import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";



const Drawer = createDrawerNavigator();

export default function DrawerStack() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "brown" },
          headerTintColor: "white",
          drawerContentStyle: { backgroundColor: "brown" },
          drawerInactiveTintColor: "white",
          drawerActiveBackgroundColor: "orange",
        }}
       
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
       
       
        
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
