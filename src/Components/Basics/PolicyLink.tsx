import React from "react";
import { Text, Linking, TouchableOpacity } from "react-native";
import i18n from "../../i18n/i18n";
import { useSelector } from "react-redux";

export default function PolicyLink() {
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage)
  const t = i18n.t
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
      {t("Leia nossas")}
        <Text className="text-[#1976D2]"> {t("Política de privacidade")}</Text>
      </Text>
    </TouchableOpacity>
  );
};
