import { useState } from "react";
import { ActivityIndicator, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MenuButton from "../../Components/Menu/Buttons";
import { sendLogoutRequest } from "../../Services/sendLogoutRequest";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n/i18n";
import { setLanguage } from "../../store/appLanguage";
import { CountryFlag } from "react-native-flag-creator";

export default function Menu({ navigation }: any) {
  const [handlingLogout, setHandlingLogout] = useState<boolean>(false);
  const dispatch = useDispatch();
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage)
  const t = i18n.t

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
        showMessage({
          message: "Erro. Tente novamente mais tarde...",
          description: data?.message,
          type: "danger",
        });
      };
    } catch (error) {
      console.log(
        `Menu.handleLogout: Exception=${JSON.stringify(error)}`
      );
      setHandlingLogout(false);
      showMessage({
        message: "Erro. Tente novamente mais tarde...",
        type: "danger",
      });
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
        <Text className="text-3xl mb-10">{t("menu.title")}</Text>
        <MenuButton
          disabled={handlingLogout}
          className={`bg-[#f2f2f2] border-[#42A5F5]`}
          onPress={handlePolicy}
        >
          <Text className="text-[#42A5F5] text-lg">{t("menu.policy")}</Text>
        </MenuButton>
        <MenuButton
          disabled={handlingLogout}
          className={`bg-[#f2f2f2] border-[#42A5F5]`}
          onPress={handleChangePassword}
        >
          <Text className="text-[#42A5F5] text-lg">{t("menu.changePassword")}</Text>

        </MenuButton>
        <MenuButton
          disabled={handlingLogout}
          className={`bg-[#f2f2f2] border-[#fb5b5a]`}
          onPress={handleDeleteAccount}
        >
          <Text className="text-[#fb5b5a] text-lg">{t("menu.deleteAccount")}</Text>
        </MenuButton>
        <MenuButton
          disabled={handlingLogout}
          className={`bg-[#f2f2f2] border-[#fb5b5a]`}
          onPress={handleLogout}
        >
          <Text className="text-[#fb5b5a] text-lg">{t("menu.logout")}</Text>
          {handlingLogout && (
            <ActivityIndicator className="absolute right-4" size="large" color='#fb5b5a' />
          )}
        </MenuButton>
        <View className="flex-row">
            <TouchableOpacity
              className={`h-6 w-6 m-2 bg-[#42A5F5] justify-center rounded-lg items-center ${
                Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black mt-6 mb-0`}
              //onpress switch between en and pt
              onPress={() => dispatch(setLanguage("pt"))}
            >
              <CountryFlag
                countryCode="br"
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 20,
                  backgroundColor: "gray",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className={`h-6 w-6 m-2 bg-[#42A5F5] justify-center rounded-lg items-center ${
                Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black mt-6 mb-0`}
              //onpress switch between en and pt
              onPress={() => dispatch(setLanguage("en"))}
            >
              <CountryFlag
                countryCode="us"
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 20,
                  backgroundColor: "gray",
                }}
              />
            </TouchableOpacity>
            
          </View>
      </View>
    </ScrollView>
  );
};