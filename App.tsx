import "react-native-gesture-handler";
import { View } from "react-native";
import AppContainer from "./src/AppContainer";
import { Provider } from "react-redux";
import store from "./src/store";
export default function App() {
  return (
    <Provider store={store}>
      <View className="flex-1">
        <AppContainer />
      </View>
    </Provider>
  );
}
