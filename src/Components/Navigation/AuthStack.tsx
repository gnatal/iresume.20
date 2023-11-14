import { createStackNavigator } from "@react-navigation/stack";
import AuthLoadingScreen from "../../Screens/Auth/AuthLoadingScreen";
import LoginScreen from "../../Screens/Auth/Login";
import NewPassword from "../../Screens/Auth/NewPassword";
import RecoverPassword from "../../Screens/Auth/RecoverPassword";
import SignScreen from "../../Screens/Auth/Signup";
import HomeLoading from "../../Screens/Profile/HomeLoading";

const Stack = createStackNavigator();
export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignScreen} />
      <Stack.Screen name="Password Recovery" component={RecoverPassword} />
      <Stack.Screen name="New Password" component={NewPassword} />
      <Stack.Screen name="HomeLoading" component={HomeLoading} />
    </Stack.Navigator>
  );
};