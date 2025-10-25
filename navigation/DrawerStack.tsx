import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import FlatListScreen from "../screens/FlatListScreen";



const Drawer = createDrawerNavigator();

export default function DrawerStack() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "white",
          drawerContentStyle: { backgroundColor: "#007AFF" },
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
          name="Calculator"
          component={CalculatorScreen}
          options={{
              title: "Calculator",
              drawerIcon: ({ color, size }) => (
                  <Ionicons name="calculator" color={color} size={size} />
              ),
          }}
        />
        
        <Drawer.Screen
          name="Products"
          component={FlatListScreen}
          options={{
            title: "Products",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
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
