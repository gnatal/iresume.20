import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/Profile/Home';
import Preview from '../../Screens/Profile/Preview';
// import Menu from '../../Screens/Profile/Menu';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faFileCode } from "@fortawesome/free-solid-svg-icons/faFileCode";
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();
export const ProfileTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: Platform.OS === "ios" ? 80 : 52 },
        tabBarActiveTintColor: "#42A5F5",
        tabBarLabelStyle: { fontSize: 12 },
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faHome} size={Platform.OS ? 20 : 30} color={color} />)
        }} />
      <Tab.Screen name="Preview" component={Preview}
        options={{
          tabBarLabel: "Preview",
          tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faFileCode} size={Platform.OS ? 20 : 30} color={color} />)
        }} />
      {/* <Tab.Screen name="Menu" component={Menu}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faBars} size={Platform.OS ? 20 : 30} color={color} />)
        }} /> */}
    </Tab.Navigator>
  );
};