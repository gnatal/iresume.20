import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import MenuButton from "../../Components/Menu/Buttons";
import { sendLogoutRequest } from "../../Services/sendLogoutRequest";
// import { showMessage } from "react-native-flash-message";

export default function Menu({ navigation }: any) {
  const [handlingLogout, setHandlingLogout] = useState<boolean>(false);

  // Logout Handler ---------------------------------------------------------------
  const handleLogout = async (): Promise<void> => {
    try {
      setHandlingLogout(true);
      const { status, data } = await sendLogoutRequest();

      if (status == 200) {
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        });
      } else {
        setHandlingLogout(false);
        // showMessage({
        //   message: "Erro. Tente novamente mais tarde...",
        //   description: data?.message,
        //   type: "danger",
        // });
      };
    } catch (error) {
      console.log(
        `Menu.handleLogout: Exception=${JSON.stringify(error)}`
      );
      setHandlingLogout(false);
    //   showMessage({
    //     message: "Erro. Tente novamente mais tarde...",
    //     type: "danger",
    //   });
    };
  };
  const handlePolicy = (): void => {
    navigation.navigate("Policy");
  };
  const handleDeleteAccount = (): void => {
    navigation.navigate("DeleteAccount");
  };
  const handleChangePassword = (): void => {
    navigation.navigate("ChangePassword");
  };

  return (
    <ScrollView className="bg-[#f2f2f2]">
      <View className="flex flex-col items-center w-screen h-screen mt-36 bg-[#f2f2f2]">
        <Text className="text-3xl mb-10">Menu</Text>
        <MenuButton
          disabled={handlingLogout}
          className={`bg-[#f2f2f2] border-[#42A5F5]`}
          onPress={handlePolicy}
        >
          <Text className="text-[#42A5F5] text-lg">Política de privacidade</Text>
        </MenuButton>
        <MenuButton
          disabled={handlingLogout}
          className={`bg-[#f2f2f2] border-[#42A5F5]`}
          onPress={handleChangePassword}
        >
          <Text className="text-[#42A5F5] text-lg">ALTERAR SENHA</Text>
        </MenuButton>
        <MenuButton
          disabled={handlingLogout}
          className={`bg-[#f2f2f2] border-[#fb5b5a]`}
          onPress={handleDeleteAccount}
        >
          <Text className="text-[#fb5b5a] text-lg">DELETAR CONTA</Text>
        </MenuButton>
        <MenuButton
          disabled={handlingLogout}
          className={`bg-[#f2f2f2] border-[#fb5b5a]`}
          onPress={handleLogout}
        >
          <Text className="text-[#fb5b5a] text-lg">SAIR</Text>
          {handlingLogout && (
            <ActivityIndicator className="absolute right-4" size="large" color='#fb5b5a' />
          )}
        </MenuButton>
      </View>
    </ScrollView>
  );
};