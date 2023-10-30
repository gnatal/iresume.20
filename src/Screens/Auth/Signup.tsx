import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
// import { useDispatch } from "react-redux";
// import { updateUserLogin } from "../../store/loginReducer";
// import { sendSignupRequest } from "../../Services/sendSignupRequest";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import Loading from "../../Components/Basics/Loading";
import * as yup from "yup";
import { KeyboardAvoidingView } from "react-native";
import PolicyLink from "../../Components/Basics/PolicyLink";
// import { showMessage } from "react-native-flash-message";

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

function Sign({ navigation }: any) {
//   const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleSignup = async ({
    email,
    password,
    passwordConfirmation,
  }: any) => {
    try {
      setLoading(true);
    //   const { status, data } = await sendSignupRequest(email, password);
      // Log status and data from response
      setLoading(false);
    //   console.log(
    //     `SignScreen.handleSignup: status=${status} | data=${JSON.stringify(
    //       data
    //     )}`
    //   );
    //   if (status == 200) {
    //     dispatch(
    //       updateUserLogin({ ID: 0, email, password, passwordConfirmation })
    //     );
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: "HomeLoading" }]
    //     });
    //   } else {
    //     showMessage({
    //       message: data.message,
    //       type: "danger",
    //     });
    //   }
    } catch (error) {
      console.log(
        `SignScreen.handleSignup: Exception=${JSON.stringify(error)}`
      );
    //   showMessage({
    //     message: "Algo deu errado. Tente novamente mais tarde...",
    //     type: "warning",
    //   });
    } finally {
      setLoading(false)
    }
  };

  const handleCancel = () => {
    navigation.navigate("Login");
  };

//   if (loading) {
//     return <Loading />;
//   }

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-90}>
      <View className="flex flex-col items-center h-screen bg-f2f2f2 justify-center">
        <View className="mt-10">
          <Image source={require("../../../assets/logo.png")} />
        </View>
        <View className="bg-[#F5F5F5] w-4/5 pb-6 mt-10 border-2 items-center border-solid  rounded-xl border-[#9FC0C7] shadow-xl shadow-black">
          <View className="w-4/5 text-black px-2 items-center mb-2 mt-8">
            <Text className="text-black mb-2  text-center">
              Crie uma conta para gerar seu currículo formatado em PDF e HTML, totalmente gratuito.
            </Text>
          </View>
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-12 mb-2 mt-2`}
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
                  placeholder="Confirme sua senha"
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
            className={`h-12 w-4/5 bg-[#009688] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-8 mb-0`}
            onPress={handleSubmit(handleSignup)}
          >
            <Text className="text-white">Criar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#42A5F5] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-2 mb-0`}
            onPress={handleCancel}
          >
            <Text className="text-white">Voltar</Text>
          </TouchableOpacity>
          <PolicyLink />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Sign;
