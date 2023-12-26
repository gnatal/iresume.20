import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { LinkInfoSchema } from "../../../Components/Yup/Schemas";
import i18n from "../../../i18n/i18n";
import { RootState } from "../../../store";
import { createLink, updateLink } from "../../../store/linkInfoReducer";
import { ILinkInfo } from "../../../utils/DataTypes";
import { DropdownIcons, linkIcons } from "../../../utils/LinkIcons";


function EditLinkInfo({ route, navigation }: any) {
  const linkInfoRedux = useSelector((state: RootState) => state.linkinfo.lInfoArray);
  const dispatch = useDispatch<any>();
  const [errorMessage, setError] = useState("");
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage)
  const t = i18n.t
  // Get the info ID from route params
  const infoID: Number = route.params?.infoID || -1;
  // Fetch info from global example array, if exist
  var info: ILinkInfo = undefined;
  if (infoID != -1)
    linkInfoRedux.forEach((value) => {
      if (value.id == infoID) info = { ...value };
    });
  // If info undefined, set Default empty params
  if (!info) info = { id: -1, label: "", url: "", enable: true, icon: -1 };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(LinkInfoSchema(t)),
    defaultValues: {
      // Set Default form values for Yup
      label: info.label,
      url: info.url,
      icon: info.icon,
      enable: info.enable,
    },
  });

  const debouncedEditLink = useDebouncedCallback(
    (EditedInfo: any) => handleEditLink(EditedInfo)
    , 1000
  )

  const handleEditLink = async (EditedInfo: any) => {
    try {
      // Set info with incoming form values
      info.label = EditedInfo?.label;
      info.url = EditedInfo?.url;
      info.icon = EditedInfo?.icon;
      info.enable = EditedInfo?.enable;

      if (info.id == -1) {
        dispatch(createLink(info));
      } else {
        dispatch(updateLink(info));
      }
      navigation.goBack();
    } catch (error) {
      setError("Algo deu errado, tente mais tarde");
      console.log(
        `EditLinkInfo.handleEditLink: Exception=${JSON.stringify(error)}`
      );
    }
  };

  const debouncedCancel = useDebouncedCallback(
    () => handleCancelEditLink()
    , 1000
  )

  const handleCancelEditLink = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.log(
        `EditLinkInfo.handleCancelEditLink: Exception=${JSON.stringify(
          error
        )}`
      );
    }
  };

  return (
    <ScrollView className="mt-10">
      <View className="flex flex-col items-center w-screen h-auto bg-[#f2f2f2]">
        <View className="w-4/5 pb-10 mb-10 mt-10 border-2 items-center border-solid shadow-xl rounded-xl bg-[#F5F5F5] border-[#9FC0C7] shadow-black">
          <View className="w-80 rounded-3xl h-14 flex items-center justify-center my-2">
            <Text className="text-black text-lg">
              {t("EditLinkInfo.title")}
            </Text>
          </View>
          {/* Label */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black px-2 justify-center h-12 mb-2 mt-2`}
          >
            <Controller
              control={control}
              name="label"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="items-center justify-center">
                  <TextInput
                    className="h-10 text-black text-center"
                    placeholder={t("EditLinkInfo.placeholder_label")}
                    placeholderTextColor="#9E9E9E"
                    defaultValue={info?.label}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          </View>
          {errors.label && (
            <Text className="text-[#FF5252] mb-2">
              {" "}
              {errors?.label?.message}{" "}
            </Text>
          )}
          {/* URL */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black px-2 justify-center h-24 mb-2 mt-0`}
          >
            <Controller
              control={control}
              name="url"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="items-center justify-center">
                  <TextInput
                    className="h-10 text-black text-center"
                    placeholder={t("EditLinkInfo.placeholder_link")}
                    placeholderTextColor="#9E9E9E"
                    defaultValue={info?.url}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          </View>
          {errors.url && (
            <Text className="text-[#FF5252] mb-2">
              {" "}
              {errors?.url?.message}{" "}
            </Text>
          )}
          {/* Icon */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black px-2 justify-center h-14 mb-0 mt-0`}
          >
            <Controller
              control={control}
              name="icon"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="items-center justify-center">
                  <SelectDropdown
                    data={[0, 1, 2, 3, 4, 5]}
                    onSelect={(selectedItem, index) => {
                      onChange(index);
                    }}
                    renderCustomizedRowChild={DropdownIcons}
                    renderCustomizedButtonChild={value > -1 ? DropdownIcons : undefined}
                    defaultButtonText={t("EditLinkInfo.placeholder_icon")}
                    defaultValue={value}
                    buttonStyle={{
                      width: "100%",
                      backgroundColor: "#F0F0F0",
                      borderRadius: 20,
                    }}
                    dropdownStyle={{
                      borderRadius: 20,
                    }}
                  />
                </View>
              )}
            />
          </View>
          {errors.icon && (
            <Text className="text-[#FF5252] mb-2">
              {" "}
              {errors?.icon?.message}{" "}
            </Text>
          )}
          {/* CheckBox stillWorkHere */}
          <View className="flex-row w-4/5 mt-4">
            <Controller
              control={control}
              name="enable"
              render={({ field: { onChange, onBlur, value } }) => (
                <Checkbox
                  className="mr-2"
                  value={value}
                  onValueChange={(newValue) => {
                    onChange(newValue);
                  }}
                  color={value ? "#42A5F5" : undefined}
                />
              )}
            />
            <Text>{t("EditLinkInfo.placeholder_enable")}</Text>
          </View>
          {/* Submit Button */}
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#42A5F5] justify-center rounded-lg items-center ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black mt-8 mb-0`}
            onPress={handleSubmit(debouncedEditLink)}
          >
            <Text className="text-white">{t("Salvar")}</Text>
          </TouchableOpacity>
          {errorMessage != "" && (
            <Text className="text-[#c3a040] mb-2 mt-2">*{errorMessage}</Text>
          )}
          {/* Cancel Button */}
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#fb5b5a] justify-center rounded-lg items-center ${Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
              } shadow-black mt-2 mb-0`}
            onPress={debouncedCancel}
          >
            <Text className="text-white">{t("Cancelar")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditLinkInfo;
