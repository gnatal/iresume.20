import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import { newPassWithToken } from "../../Services/newPasswordWithToken";
import * as yup from "yup";
import { useSelector } from "react-redux";
import i18n from "../../i18n/i18n";

const newPasswordSchema = yup.object().shape({
  token: yup.string().required("Token required"),
  password: yup.string().required().min(8),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

function NewPassword({ navigation }: any) {
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
      password: "",
      passwordConfirmation: "",
      token: "",
    },
  });

  const handleNewPassword = async ({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) => {
    try {
      const { status, data } = await newPassWithToken(token, password);
      console.log({ status, data });
      if (status === 200) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(
        `NewPassWithToken.handleLogin: Exception=${JSON.stringify(error)}`
      );
    }
  };

  const handleCancel = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView>
      <View className="flex justify-start items-center w-screen h-screen bg-[#FFFFFF]">
        <View className="mt-10">
          <Image source={require("../../../assets/logo.png")} />
        </View>
        <View className="bg-[#F5F5F5] w-4/5 pb-10 mt-10 border-2 items-center border-solid  rounded-xl border-[#9FC0C7] shadow-xl shadow-black">
          <Text className="w-4/5 my-8 text-center">{t("informe sua nova senha")}</Text>
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
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
                  placeholder="Senha"
                  secureTextEntry={true}
                  placeholderTextColor="#9E9E9E"
                  onChangeText={onChange}
                  autoCapitalize="none"
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
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
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
                  placeholder={t("Confirmar senha")}
                  secureTextEntry={true}
                  placeholderTextColor="#9E9E9E"
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
              )}
            />
          </View>
          {errors.passwordConfirmation && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.passwordConfirmation?.message}
            </Text>
          )}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-12 mb-2 mt-2`}
          >
            <Controller
              control={control}
              name="token"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black"
                  placeholder="Token"
                  placeholderTextColor="#9E9E9E"
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.token && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.token?.message}
            </Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit(handleNewPassword)}
            className={`h-12 w-4/5 bg-[#42A5F5] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-8 mb-0`}
          >
            <Text className="text-white">{t("Enviar")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#009688] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-2 mb-0`}
            onPress={handleCancel}
          >
            <Text className="text-white">{t("Cancelar")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default NewPassword;
