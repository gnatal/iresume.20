import React from "react";
import { Text, View, TouchableOpacity, Image, Platform, TextInput, ScrollView } from "react-native";

function NewPassword({ navigation }: any) {
  return (
    <ScrollView >
      <View className="flex justify-start items-center w-screen h-screen bg-[#FFFFFF]">
        <View className="mt-10">
          <Image source={require("../../../assets/logo.png")} />
        </View>
        <View className="bg-[#F5F5F5] w-4/5 pb-10 mt-10 border-2 items-center border-solid  rounded-xl border-[#9FC0C7] shadow-xl shadow-black">
          <Text className="w-4/5 my-8 text-center">Informe uma nova senha</Text>
          <TextInput
            className={`h-10 w-4/5 my-2 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2`}
            placeholder="New Password"
          />
          <TextInput
            className={`h-10 w-4/5 my-2 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2`}
            placeholder="Confirm Password"
          />
          <TouchableOpacity
            className={`h-10 w-4/5 mt-4 bg-[#42A5F5] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black`}
          >
            <Text className="text-white">Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default NewPassword;
