import React, { useState } from "react";
import { ActivityIndicator, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { sendDeleteAccountRequest } from "../../Services/sendDeleteAccountRequest";
import { showMessage } from "react-native-flash-message";

export default function DeleteAccount({ navigation }: any) {
  const [handlingDelete, setHandlingDelete] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setHandlingDelete(true);
      const { status } = await sendDeleteAccountRequest();
      if (status == 200) {
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }]
        });
      } else {
        showMessage({
          message: "Erro. Tente novamente mais tarde...",
          type: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setHandlingDelete(false);
  };

  return (
    <ScrollView className="bg-[#f2f2f2]">
      <View className="flex justify-start items-center w-screen h-screen bg-[#f2f2f2]">
        <View className="bg-[#F5F5F5] w-4/5 pb-10 mt-36 border-2 items-center border-solid  rounded-xl border-[#9FC0C7] shadow-xl shadow-black">
          <Text className="w-4/5 my-8 text-center text-xl">Certeza de que deseja excluir sua conta e todos os seus dados?</Text>
          <TouchableOpacity
            disabled={handlingDelete}
            className={`h-10 w-4/5 mt-4 bg-[#42A5F5] justify-center rounded-lg items-center ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black`}
            onPress={handleDeleteAccount}
          >
            <Text className="text-white">SIM</Text>
            {handlingDelete && (
              <ActivityIndicator className="absolute right-4" size="large" color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={handlingDelete}
            className={`h-10 w-4/5 mt-4 bg-[#fb5b5a] justify-center rounded-lg items-center ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black`}
            onPress={() => { navigation.goBack() }}
          >
            <Text className="text-white">NÃO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
