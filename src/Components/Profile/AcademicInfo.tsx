import React from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { IAcademicProps } from "../../utils/DataTypes";
import {
  AddInfoButton,
  CancelEditButton,
  EditButton,
} from "../Basics/EditButtons";
import { FadePanel } from "../Basics/FadePanel";
import { useDispatch, useSelector } from "react-redux";
import { deleteAcademic } from "../../store/academicInfoReducer";
import { RootState } from "../../store";
import i18n from "../../i18n/i18n";

const Box = ({ className = "", ...props }) => (
  <View
    className={`flex justify-center p-2 border-b-2 border-[#BDBDBD] bg-[#F5F5F5] ${className}`}
    {...props}
  />
);
const TextFields = ({ className = "", ...props }) => (
  <Text className={`text-[#9E9E9E] text-justify ${className}`} {...props} />
);

const AcademicInfo: React.FC<IAcademicProps> = ({
  AcademicInfoArray,
  Edit,
  navigation,
}) => {
  const infoToRender = [];
  const lastItemClassName = "border-b-0";
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((state: RootState) => state.academicinfo);
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage);
  const t = i18n.t;

  if (isLoading) {
    infoToRender.push(
      <Box key={1} className={lastItemClassName}>
        <ActivityIndicator size="large" color="#33B5E5" />
      </Box>
    );
  } else {
    if (AcademicInfoArray != undefined && AcademicInfoArray.length > 0) {
      AcademicInfoArray.forEach((value, index, array) => {
        infoToRender.push(
          <View key={index}>
            <Box className={index < array.length - 1 ? "" : lastItemClassName}>
              <TextFields className="text-xl">{value.graduation}</TextFields>
              <TextFields>{value.institution}</TextFields>
              <TextFields>
                {value.startDateMonth + "/" + value.startDateYear}-
                {value.endDateMonth != 0
                  ? value.endDateMonth + "/" + value.endDateYear
                  : "Sem previsão"}
              </TextFields>
              <TextFields>{value.description}</TextFields>
            </Box>
            <FadePanel visible={Edit}>
              <EditButton
                disabled={!Edit}
                className="absolute bottom-[35] right-[-20]"
                onPress={() => {
                  navigation.navigate("EditAcademicInfo", { infoID: value.id });
                }}
              />
              <CancelEditButton
                disabled={!Edit}
                className="absolute bottom-[35] left-[-20]"
                onPress={() => {
                  dispatch(deleteAcademic(value.id));
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
            {t("AddAcademicInfo")}
          </TextFields>
        </Box>
      );
    }
  }

  return (
    <View
      className={`w-4/5 mt-10 items-center rounded-xl ${Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
        } shadow-black bg-[#F5F5F5]`}
    >
      <View className="w-full py-2 bg-[#0D47A1] rounded-t-xl">
        <TextFields className="text-xl text-white text-center">
          {t("AcademicHeader")}
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
            navigation.navigate("EditAcademicInfo");
          }}
        />
      </FadePanel>
    </View>
  );
};

export default AcademicInfo;
