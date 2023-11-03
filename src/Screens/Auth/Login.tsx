import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateUserLogin } from "../../store/loginReducer";
import { sendLoginRequest } from "../../Services/sendLoginRequest";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../Components/Basics/Loading";
import * as yup from "yup";
// import { showMessage } from "react-native-flash-message";
import PolicyLink from "../../Components/Basics/PolicyLink";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

function Login({ navigation }: any) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const directLogin = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeLoading" }],
    });
  };

  const handleLogin = async ({ email, password }: any) => {
    try {
      console.log({ email: email.toLowerCase(), password });
      setLoading(true);
      const { status, data } = await sendLoginRequest(
        email.toLowerCase(),
        password
      );
      setLoading(false);
      // Log status and data from response
      console.log(
        `LoginScreen.handleLogin: status=${status} | data=${JSON.stringify(
          data
        )}`
      );

      if (status == 200) {
        dispatch(
          updateUserLogin({
            ID: data.userId || 0,
            email,
            password,
            passwordConfirmation: "",
          })
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "ProfileTab" }],
        });
      } else {
        // showMessage({
        //   message: data?.message,
        //   type: "danger",
        // });
      }
    } catch (error) {
      console.log(
        `LoginScreen.handleLogin: Exception=${JSON.stringify(error)}`
      );
      //   showMessage({
      //     message: "Algo deu errado. Tente novamente mais tarde...",
      //     type: "warning",
      //   });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-50}>
      <View className="flex flex-col items-center h-screen bg-[#f2f2f2] justify-center">
        <View className="mt-10">
          <Image source={require("../../../assets/logo.png")} />
        </View>
        <View className="bg-[#F5F5F5] w-4/5 pb-6 pt-10 mt-10 border-2 items-center border-solid  rounded-xl border-[#9FC0C7] shadow-xl shadow-black">
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
                />
              )}
            />
          </View>
          {errors.email && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.email?.message}
            </Text>
          )}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-12 mb-0 mt-2`}
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
                />
              )}
            />
          </View>
          {errors.password && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.password?.message}
            </Text>
          )}
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#42A5F5] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-8 mb-0`}
            onPress={handleSubmit(handleLogin)}
          >
            <Text className="text-white">Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#009688] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-2 mb-0`}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text className="text-white">Criar nova conta</Text>
          </TouchableOpacity>
          <View className="w-80 h-18 flex items-center justify-center mt-4 mb-0">
            <Text
              className="text-[#1976D2] text-sm text-center"
              onPress={() => {
                navigation.navigate("Password Recovery");
              }}
            >
              Recuperar senha
            </Text>
            <PolicyLink />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
