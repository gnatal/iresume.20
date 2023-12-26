import React from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n/i18n";
import { RootState } from "../../store";
import { deleteLink } from "../../store/linkInfoReducer";
import { ILinkProps } from "../../utils/DataTypes";
import {
  AddInfoButton,
  CancelEditButton,
  EditButton,
} from "../Basics/EditButtons";
import { FadePanel } from "../Basics/FadePanel";
import { DropdownIcons } from "../../utils/LinkIcons";

const Box = ({ className = "", ...props }) => (
  <View
    className={`flex flex-row items-center justify-center p-2 border-b-2 border-[#BDBDBD] bg-[#F5F5F5] ${className}`}
    {...props}
  />
);
const TextFields = ({ className = "", ...props }) => (
  <Text className={`text-[#a1a1a1] text-left ${className}`} {...props} />
);

const LinkInfo: React.FC<ILinkProps> = ({
  LinkInfoArray,
  Edit,
  navigation,
}) => {
  const infoToRender = [];
  const lastItemClassName = "border-b-0";
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((state: RootState) => state.linkinfo);
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
    if (LinkInfoArray != undefined && LinkInfoArray.length > 0) {
      LinkInfoArray.forEach((value, index, array) => {
        infoToRender.push(
          <View key={index}>
            <Box className={index < array.length - 1 ? "" : lastItemClassName}>
              <TextFields className="basis-3/12 text-xl">
                {value.label}
              </TextFields>
              <TextFields className="basis-6/12 text-center">
                {value.url}
              </TextFields>
              <TextFields className="basis-3/12 text-center">
                {DropdownIcons("", value.icon, false)}
              </TextFields>
            </Box>
            <FadePanel visible={Edit}>
              <EditButton
                disabled={!Edit}
                className="absolute bottom-[5] right-[-25]"
                onPress={() => {
                  navigation.navigate("EditLinkInfo", { infoID: value.id });
                }}
              />
              <CancelEditButton
                disabled={!Edit}
                className="absolute bottom-[5] left-[-25]"
                onPress={() => {
                  dispatch(deleteLink(value.id));
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
            {t("AddLinkInfo")}
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
          {t("LinkHeader")}
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
            navigation.navigate("EditLinkInfo");
          }}
        />
      </FadePanel>
    </View>
  );
};

export default LinkInfo;
