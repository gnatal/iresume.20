import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import i18n from "../../i18n/i18n";

export default function Policy({ navigation }: any) {
  const [policyPage, setHtml] = useState("<h1>Loading</h1>");
  const [requested, setRequested] = useState(false);
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage);
  const t = i18n.t;
  useEffect(() => {
    const getHTMLPage = async () => {
      // using boolean to avoid double request
      if (!requested) {
        try {
          setRequested(true);
          const Axios = axios.create({ baseURL: process.env.EXPO_PUBLIC_S3_BUCKET_URL });
          const result = await Axios.get(process.env.EXPO_PUBLIC_S3_POLICY_ENDPOINT);
          let html = result.data;
          html = html.replace("<style>", "<style>body{zoom: 250%;}");
          setHtml(html);
        } catch (error) {
          console.log("Policy.getHTMLPage:", error);
          setHtml("<h1>Error loading page</h1>");
          showMessage({
            message: "Ocorreu algum erro ao tentar carregar a política de privacidade",
            type: "danger",
          });
        }
      }
    }
    getHTMLPage()
  }, []);

  return (
    <ScrollView className="bg-[#ffffff]">
      <View className="items-center mt-36">
        <Text className="text-3xl">{t("Política de privacidade")}</Text>
      </View>
      <View className="h-[500] mt-10">
        <WebView
          source={{
            html: policyPage,
          }}
        />
      </View>
      <View className="items-center mt-10">
        <TouchableOpacity
          className={`h-10 w-4/5 mt-4 bg-[#42A5F5] justify-center rounded-lg items-center ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black`}
          onPress={() => { navigation.goBack() }}
        >
          <Text className="text-white">{t("Voltar")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
