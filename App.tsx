import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from './src/Components/Menu/Button';
import Login from './src/Screens/Auth/Login';
import Sign from './src/Screens/Auth/Signup';

export default function App() {
  return (
    <View className="flex-1">
      <Sign />
    </View>
  );
}

