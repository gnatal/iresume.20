import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  RefreshControl,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import * as Print from "expo-print";
import { generateDoc } from "../../Services/generateHTMLFile/doc";
import { generateDoc as generateDoc2 } from "../../Services/generateHTMLFile/template2/template2doc";
import { generateDoc as generateDoc3 } from "../../Services/generateHTMLFile/template3/template3doc";
import { shareAsync } from "expo-sharing";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import * as Clipboard from "expo-clipboard";
import { writeHTMLFile } from "../../Services/fileService";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/profileInfoReducer";
import SelectDropdown from "react-native-select-dropdown";
import { showMessage } from "react-native-flash-message";
import i18n from "../../i18n/i18n";

export default function Preview({ navigation }: any) {
  const profileInfoRedux = useSelector((state: RootState) => state.profileinfo);
  const academicInfoRedux = useSelector(
    (state: RootState) => state.academicinfo
  );
  const professionalInfoRedux = useSelector(
    (state: RootState) => state.professionalinfo
  );
  const languageInfoRedux = useSelector(
    (state: RootState) => state.languageinfo
  );
  const skillInfoRedux = useSelector(
    (state: RootState) => state.skillinfo
  );
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage);
  const t = i18n.t;

  const [html, setHtml] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);
  const [template, setTemplate] = useState(0);
  const dispatch = useDispatch<any>();
  const webviewHeight = Dimensions.get("window").height > 600 ? Dimensions.get("window").height * (5 / 7) : Dimensions.get("window").height * (2 / 4);

  const generateHTMLData = () => {
    return {
      profile: {
        name: profileInfoRedux.name,
        image: profileInfoRedux.photo,
        email: profileInfoRedux.email,
        phone: profileInfoRedux.phone,
      },
      professionalExperience: professionalInfoRedux.pInfoArray,
      skillInfo: skillInfoRedux.sInfoArray,
      academicInfo: academicInfoRedux.aInfoArray,
      languages: languageInfoRedux.lInfoArray,
    };
  };

  useEffect(() => {
    // generateHTMLPage(template);
  }, []);

  const generateHTMLPage = async (template = 0) => {
    try {
      const indexToTemplate = [generateDoc, generateDoc2, generateDoc3];
      const htmlData = generateHTMLData();
      const newHtml = indexToTemplate[template](htmlData);
      console.log("GENERATING PAGE", template);

      setHtml(newHtml);
      const fileUrl = await writeHTMLFile("test.html", newHtml);
      const updateUser = {
        name: profileInfoRedux.name,
        image: profileInfoRedux.photo,
        email: profileInfoRedux.email,
        phone: profileInfoRedux.phone,
      };
      if (fileUrl) {
        dispatch(updateProfile({ ...updateUser, pdfLink: fileUrl }));
        setTimeout(() => {
          setKey(key + 1);
        }, 800); // don't change THIS CAUSE THE WEBVIEW MAY CRASH IF THE UPDATE TIME IS TOO SHORT
      } else {
        showMessage({
          message: "Não foi possível criar seu resume...",
          description: "Tente novamente mais tarde",
          type: "warning",
        });
      }
    } catch (e) {
      console.log("Error generating html page", e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setKey(key + 1);
    }, 600);
    generateHTMLPage(template);
  };

  const downloadAsPdf = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <View className="flex flex-column">
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <View className="w-full flex items-center mt-10">
        <SelectDropdown
          data={["White Ofice", "Purple day", "Blue sky"]}
          onSelect={(selectedItem, index) => {
            setTemplate(index);
            generateHTMLPage(index);
          }}
          defaultButtonText={t("SelectTemplate")}
          buttonStyle={{
            width: 400,
            backgroundColor: "#FFF",
            borderRadius: 20,
          }}
          dropdownStyle={{
            borderRadius: 20,
          }}
        />
      </View>
      <View className="flex flex-row gap-x-6 mt-4 justify-center items-center">
        <TouchableOpacity
          disabled={false}
          className="w-40 bg-[#42A5F5] rounded-3xl h-8 items-center justify-center"
          onPress={downloadAsPdf}
        >
          <Text className="text-white">{t("DownloadPDF")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={false}
          className="w-40 bg-[#42A5F5] rounded-3xl h-8 items-center justify-center"
          onPress={() => { Clipboard.setStringAsync(profileInfoRedux.pdfLink) }}
        >
          <Text className="text-white">{t("CopyLink")}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: webviewHeight,
          borderColor: "#ff00ff",
        }}
      >
        {!refreshing && profileInfoRedux.pdfLink ? (
          <WebView
            nestedScrollEnabled
            source={{
              uri:
                profileInfoRedux.pdfLink ||
                "https://en.wikipedia.org/wiki/HTTP_404",
            }}
            key={key}
            style={{
              marginTop: 20,
              height: webviewHeight,
            }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-gray-600">
              Você ainda não tem um currículo
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
