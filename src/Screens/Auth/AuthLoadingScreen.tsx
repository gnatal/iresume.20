import React, { useEffect } from "react";
import { View } from "react-native";
import Loading from "../../Components/Basics/Loading";
import { sendLoginJWTRequest } from "../../Services/sendLoginJWTRequest";

export default function AuthLoadingScreen({ navigation }: any) {
  useEffect(() => {
    const handleLoginJWT = async (): Promise<void> => {
      try {
        console.log("handleLoginJWT");
        const response = await sendLoginJWTRequest();
        if (response.status == 201) {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeLoading" }]
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
          });
        }
      } catch (error) {
        console.log("AuthLoadingScreen:", error);
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        });
      }
    };

    handleLoginJWT().catch(console.error);
  }, []);

  return (
    <View className="flex flex-col items-center h-screen bg-[#f2f2f2]">
      <Loading />
    </View>
  );
};