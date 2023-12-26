import { ReactNode } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
export const linkIcons: ReactNode[] = [
  <View></View>,
  <AntDesign name="linkedin-square" size={24} color="black" />,
  <AntDesign name="github" size={24} color="black" />,
  <AntDesign name="facebook-square" size={24} color="black" />,
  <AntDesign name="instagram" size={24} color="black" />,
  <MaterialIcons name="home" size={24} color="black" />,
];

export const DropdownIcons = (selectedItem: any, index: number, isSelected?: boolean) => {

  return (
    <View className="items-center">
      {linkIcons[index] || <Text>{selectedItem}</Text>}
    </View>
  )
};