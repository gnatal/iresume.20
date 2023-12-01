import React from "react";
import { Text, View, TouchableOpacity, Image, Platform, TextInput, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPasswordRequest } from "../../Services/newPassword";
import { useSelector } from "react-redux";
import i18n from "../../i18n/i18n";

const newPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

function RecoverPassword({ navigation }: any) {
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage);
  const t = i18n.t;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(newPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleRecoverpassword = async ({ email }: {email: string}) => {
    try {
      const { status, data } = await resetPasswordRequest(email.toLowerCase());
      console.log({ status, data });
      if (status === 200) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(
        `RecoverPasswordScreen.handleLogin: Exception=${JSON.stringify(error)}`
      );
    }
  };

  return (
    <ScrollView >
      <View className="flex items-center w-screen h-screen bg-[#FFFFFF] justify-center">
        <View className="mt-10">
          <Image source={require("../../../assets/logo.png")} />
        </View>
        <View className="bg-[#F5F5F5] w-4/5 pb-10 mt-10 border-2 items-center border-solid  rounded-xl border-[#9FC0C7] shadow-xl shadow-black">
          <Text className="w-4/5 my-8 text-center">
          {t("RecoverMessage")}
          </Text>
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-12 mb-0 mt-2`}
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black"
                  placeholder="Email"
                  placeholderTextColor="#9E9E9E"
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
              )}
            />
          </View>
          {errors.email && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.email?.message}
            </Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit(handleRecoverpassword)}
            className={`h-12 w-4/5 bg-[#42A5F5] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-8 mb-0`}
          >
            <Text className="text-white">{t("Enviar")}</Text>
          </TouchableOpacity>
          <View className="w-4/5 h-18 flex items-center justify-center mt-4 mb-0">
            <Text
              className="text-[#1976D2] text-sm text-center"
              onPress={() => {
                navigation.navigate("New Password");
              }}
            >
              {t("Já tem o código")}	
            </Text>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

export default RecoverPassword;
