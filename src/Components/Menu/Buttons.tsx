import { Platform, TouchableOpacity } from "react-native";

const MenuButton = ({ className = "", ...props }) => (
  <TouchableOpacity className={`border-2 w-80 rounded-lg h-12 items-center justify-center mt-0 mb-2 
  ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"} shadow-black px-2 ${className}`} {...props} />
);

export default MenuButton;