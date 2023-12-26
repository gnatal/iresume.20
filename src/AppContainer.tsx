// import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
// import * as Linking from "expo-linking";
import { AuthStackNavigator } from "./Components/Navigation/AuthStack";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileTabNavigator } from "./Components/Navigation/ProfileTab";
import EditAcademicInfo from "./Screens/Edit/EditAcademicInfo";
import EditProfessionalInfo from "./Screens/Edit/EditProfessionalInfo";
import EditLanguageInfo from "./Screens/Edit/EditLanguageInfo";
import EditSkillInfo from "./Screens/Edit/EditSkillInfo";
import EditProfileInfo from "./Screens/Edit/EditProfileInfo";
import DeleteAccount from "./Screens/Menu/DeleteAccount";
import ChangePassword from "./Screens/Menu/ChangePassword";
import FlashMessage from "react-native-flash-message";
import Policy from "./Screens/Menu/Policy";
import EditLinkInfo from "./Screens/Edit/EditLinkInfo";
// import * as Updates from 'expo-updates';

// const prefix = Linking.createURL("/");
// const linking = {
//   prefixes: [prefix],
//   config: {
//     screens: {
//       Login: "login",
//       Signup: "Signup",
//     },
//   },
// };

// const AppStackNavigator = () => {
//   return (
//     <AppStack.Navigator screenOptions={{ headerShown: false }}>
//       <AppStack.Screen name="AuthStack" component={AuthStackNavigator} />
//       <AppStack.Screen name="ProfileTab" component={ProfileTabNavigator} />
//       <AppStack.Screen name="EditAcademicInfo" component={EditAcademicInfo} />
//       <AppStack.Screen name="EditProfessionalInfo" component={EditProfessionalInfo} />
//       <AppStack.Screen name="EditLanguageInfo" component={EditLanguageInfo} />
//       <AppStack.Screen name="EditSkillInfo" component={EditSkillInfo} />
//       <AppStack.Screen name="EditProfileInfo" component={EditProfileInfo} />
//       <AppStack.Screen name="DeleteAccount" component={DeleteAccount} />
//       <AppStack.Screen name="ChangePassword" component={ChangePassword} />
//       <AppStack.Screen name="Policy" component={Policy} />
//     </AppStack.Navigator>
//   );
// };

const AppStack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <AppStack.Screen name="ProfileTab" component={ProfileTabNavigator} />
      <AppStack.Screen name="EditAcademicInfo" component={EditAcademicInfo} />
      <AppStack.Screen name="EditLanguageInfo" component={EditLanguageInfo} />
      <AppStack.Screen name="EditProfileInfo" component={EditProfileInfo} />
      <AppStack.Screen
        name="EditProfessionalInfo"
        component={EditProfessionalInfo}
      />
      <AppStack.Screen name="EditSkillInfo" component={EditSkillInfo} />
      <AppStack.Screen name="EditLinkInfo" component={EditLinkInfo} />
      <AppStack.Screen name="ChangePassword" component={ChangePassword} />
      <AppStack.Screen name="DeleteAccount" component={DeleteAccount} />
      <AppStack.Screen name="Policy" component={Policy} />
    </AppStack.Navigator>
  );
};

// const App = () => (
//   <NavigationContainer linking={linking}>
//     <AppStackNavigator />
//     <FlashMessage position="top" duration={3000} statusBarHeight={50} />
//   </NavigationContainer>
// );

const App = () => (
  <NavigationContainer>
    <AppStackNavigator />
    <FlashMessage position="top" duration={3000} statusBarHeight={50} />
  </NavigationContainer>
);

export default App;
