import React from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { ILanguageProps } from "../../utils/DataTypes";
import {
  AddInfoButton,
  CancelEditButton,
  EditButton,
} from "../Basics/EditButtons";
import { FadePanel } from "../Basics/FadePanel";
import { useDispatch } from "react-redux";
import { deleteLanguage } from "../../store/languageInfoReducer";
import { PercentProgressCircle } from "../Basics/ProgressCircle";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import i18n from "../../i18n/i18n";

const Box = ({ className = "", ...props }) => (
  <View
    className={`flex flex-row items-center justify-center p-2 border-b-2 border-[#BDBDBD] bg-[#F5F5F5] ${className}`}
    {...props}
  />
);
const TextFields = ({ className = "", ...props }) => (
  <Text className={`text-[#a1a1a1] text-left ${className}`} {...props} />
);

const LanguageInfo: React.FC<ILanguageProps> = ({
  LanguageInfoArray,
  Edit,
  navigation,
}) => {
  const infoToRender = [];
  const lastItemClassName = "border-b-0";
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((state: RootState) => state.languageinfo);
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage)
  const t = i18n.t

  if (isLoading) {
    infoToRender.push(
      <Box key={1} className={lastItemClassName}>
        <ActivityIndicator size="large" color="#33B5E5" />
      </Box>
    );
  } else {
    if (LanguageInfoArray != undefined && LanguageInfoArray.length > 0) {
      LanguageInfoArray.forEach((value, index, array) => {
        infoToRender.push(
          <View key={index}>
            <Box className={index < array.length - 1 ? "" : lastItemClassName}>
              <TextFields className="basis-8/12 text-xl">
                {value.language}
              </TextFields>
              <TextFields className="basis-2/12 text-center">
                {value.level}%
              </TextFields>
              <View className="basis-2/12 items-center">
                <PercentProgressCircle percent={value.level} />
              </View>
            </Box>
            <FadePanel visible={Edit}>
              <EditButton
                disabled={!Edit}
                className="absolute bottom-[5] right-[-25]"
                onPress={() => {
                  navigation.navigate("EditLanguageInfo", { infoID: value.id });
                }}
              />
              <CancelEditButton
                disabled={!Edit}
                className="absolute bottom-[5] left-[-25]"
                onPress={() => {
                  dispatch(deleteLanguage(value.id));
                }}
              />
            </FadePanel>
          </View>
        );
      });
    } else {
      infoToRender.push(
        <Box key={0} className={lastItemClassName}>
          <TextFields className="text-xl text-center my-4">
            {t("AddLanguageInfo")}
          </TextFields>
        </Box>
      );
    }
  }

  return (
    <View
      className={`w-4/5 mt-10 items-center rounded-xl ${
        Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
      } shadow-black bg-[#F5F5F5]`}
    >
      <View className="w-full py-2 bg-[#0D47A1] rounded-t-xl">
        <TextFields className="text-xl text-white text-center">
          {t("LanguageHeader")}
        </TextFields>
      </View>
      <View className="flex flex-row">
        {/* Inside BOX */}
        <View className="p-1 justify-center w-full">{infoToRender}</View>
        {/* Inside BOX */}
      </View>
      <FadePanel visible={Edit}>
        <AddInfoButton
          disabled={!Edit}
          className="absolute bottom-[-20]"
          onPress={() => {
            navigation.navigate("EditLanguageInfo");
          }}
        />
      </FadePanel>
    </View>
  );
};

export default LanguageInfo;
