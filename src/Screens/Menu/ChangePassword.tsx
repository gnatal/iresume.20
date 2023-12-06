import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ChangePasswordSchema } from "../../Components/Yup/Schemas";
import { sendChangePasswordRequest } from "../../Services/sendChangePasswordRequest";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import i18n from "../../i18n/i18n";


export default function ChangePassword({ navigation }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage);
  const t = i18n.t;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ChangePasswordSchema(t)),
    defaultValues: {
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleChangePassword = async ({ oldPassword, password, passwordConfirmation }: any) => {
    try {
      setLoading(true);
      const { status } = await sendChangePasswordRequest(oldPassword, password);
      if (status == 200) {
        navigation.goBack();
      } else {
        showMessage({
          message: "Erro. Tente novamente mais tarde...",
          type: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <ScrollView className="bg-[#f2f2f2]">
      <View className="flex justify-start items-center w-screen h-screen bg-[#f2f2f2]">
        <View className="bg-[#F5F5F5] w-4/5 pb-10 mt-36 border-2 items-center border-solid  rounded-xl border-[#9FC0C7] shadow-xl shadow-black">
          <Text className="w-4/5 my-8 text-center text-lg">{t("informeAtualSenha")}</Text>
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black px-2 justify-center h-12 mb-2 mt-2`}
          >
            <Controller
              control={control}
              name="oldPassword"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black"
                  placeholder={t("Senhaatual")}
                  secureTextEntry={true}
                  placeholderTextColor="#9E9E9E"
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.oldPassword && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.oldPassword?.message}
            </Text>
          )}
          <Text className="w-4/5 my-8 text-center text-lg">{t("informeNovaSenha")}</Text>
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black px-2 justify-center h-12 mb-2 mt-2`}
          >
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black"
                  placeholder={t("Senhanova")}
                  secureTextEntry={true}
                  placeholderTextColor="#9E9E9E"
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.password && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.password?.message}
            </Text>
          )}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black px-2 justify-center h-12 mb-2 mt-2`}
          >
            <Controller
              control={control}
              name="passwordConfirmation"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black"
                  placeholder={t("confirmeNovaSenha")}
                  secureTextEntry={true}
                  placeholderTextColor="#9E9E9E"
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.passwordConfirmation && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.passwordConfirmation?.message}
            </Text>
          )}
          <TouchableOpacity
            disabled={loading}
            className={`h-10 w-4/5 mt-4 bg-[#42A5F5] justify-center rounded-lg items-center ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black`}
            onPress={handleSubmit(handleChangePassword)}
          >
            <Text className="text-white">{t("alterarSenha")}</Text>
            {loading && (
              <ActivityIndicator className="absolute right-4" size="large" color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            className={`h-10 w-4/5 mt-4 bg-[#fb5b5a] justify-center rounded-lg items-center ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black`}
            onPress={() => { navigation.goBack() }}
          >
            <Text className="text-white">{t("Cancelar")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
