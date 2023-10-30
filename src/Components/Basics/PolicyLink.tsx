import React from "react";
import { Text, Linking, TouchableOpacity } from "react-native";

export default function PolicyLink() {
  const handlePolicyLinking = async () => {
    try {
      const url: string = process.env.EXPO_PUBLIC_S3_BUCKET_URL + process.env.EXPO_PUBLIC_S3_POLICY_ENDPOINT;
      await Linking.openURL(url);
    } catch (error) {
      console.error("handlePolicyLinking:", error);
    }
  }
  return (
    <TouchableOpacity onPress={handlePolicyLinking} className="mt-4">
      <Text className="text-black text-base">
        Leia nossas
        <Text className="text-[#1976D2]"> Políticas de privacidade</Text>
      </Text>
    </TouchableOpacity>
  );
};
