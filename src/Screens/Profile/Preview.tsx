import React, { useEffect, useState } from "react";
import {
  Platform,
  Text,
  View,
  Linking,
  SafeAreaView,
  ScrollView,
  RefreshControl,
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
  const skillInfoRedux = useSelector((state: RootState) => state.skillinfo);

  const [html, setHtml] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);
  const [template, setTemplate] = useState(0);
  const dispatch = useDispatch<any>();

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
    generateHTMLPage(template);
  }, []);

  const generateHTMLPage = async (template = 0) => {
    try {
      const indexToTemplate = [generateDoc, generateDoc2, generateDoc3];
      const htmlData = generateHTMLData();
      const newHtml = indexToTemplate[template](htmlData);
      console.log("GENERATING PAGE", template);

      setHtml(newHtml);
      const fileUrl = await writeHTMLFile(
        "test.html",
        newHtml
      );
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
          type: "warning"
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
    <SafeAreaView>
      <ScrollView>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <View className="w-full flex items-center">
          <Text className="pt-4 text-lg pb-2"> Select your template</Text>
          <SelectDropdown
            data={["White Ofice", "Purple day", "Blue sky"]}
            onSelect={(selectedItem, index) => {
              console.log("SELECTED ITEM AND INDEX", selectedItem, index);
              setTemplate(index);
              generateHTMLPage(index);
            }}
            buttonStyle={{
              width: 400,
              backgroundColor: "#FFF",
              borderRadius: 20,
            }}
          />
        </View>
        {!refreshing && (
          <View className="h-[600]">
            <WebView
              source={{
                uri: profileInfoRedux.pdfLink || "https://en.wikipedia.org/wiki/HTTP_404",
              }}
              key={key}
              style={{ marginTop: Platform.OS === "ios" ? 20 : 30 }}
            />
          </View>
        )}
        <View className="flex justify-center items-center">
          <Text
            className="color-[#0000ff] mt-4 mb-2"
            onPress={() => {
              Clipboard.setStringAsync(profileInfoRedux.pdfLink);
            }}
          >
            Link to file: click here
          </Text>
          <TouchableOpacity
            disabled={false}
            className="w-80 bg-[#c3a040] rounded-3xl h-8 items-center justify-center mb-4"
            onPress={downloadAsPdf}
          >
            <Text className="text-white">Download PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
