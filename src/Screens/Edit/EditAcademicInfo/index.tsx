import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AcademicInfoSchema } from "../../../Components/Yup/Schemas";
import { ScrollView } from "react-native-gesture-handler";
import { IAcademicInfo } from "../../../utils/DataTypes";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  createAcademic,
  updateAcademic,
} from "../../../store/academicInfoReducer";
import { useDebouncedCallback } from "use-debounce";
import i18n from "../../../i18n/i18n";

function EditAcademicInfo({ route, navigation }: any) {
  const academicInfoRedux = useSelector(
    (state: RootState) => state.academicinfo.aInfoArray
  );
  const dispatch = useDispatch<any>();
  const [errorMessage, setError] = useState("");
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage)
  const t = i18n.t
  // Get the info ID from route params
  const infoID: Number = route.params?.infoID || -1;
  // Fetch info from global example array, if exist
  var info: IAcademicInfo = undefined;
  if (infoID != -1)
    academicInfoRedux.forEach((value) => {
      if (value.id == infoID) info = { ...value };
    });
  // If info undefined, set Default empty params
  if (!info)
    info = {
      id: -1,
      graduation: "",
      institution: "",
      description: "",
      startDateMonth: 0,
      startDateYear: 0,
      endDateMonth: 0,
      endDateYear: 0,
    };

  // CheckBox
  const [isChecked, setChecked] = useState(info.endDateYear == 0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(AcademicInfoSchema(t)),
    defaultValues: {
      // Set Default form values for Yup
      graduation: info.graduation,
      institution: info.institution,
      description: info.description,
      stillWorkHere: isChecked,
      startDateMonth: info.startDateMonth,
      startDateYear: info.startDateYear,
      endDateMonth: info.endDateMonth,
      endDateYear: info.endDateYear,
    },
  });

  const debouncedEditAcademicInfo = useDebouncedCallback(
    (EditInfo: any) => handleEditAcademic(EditInfo),
    1000
  );

  const handleEditAcademic = async (EditedInfo: any) => {
    try {
      // Set info with incoming form values
      info.graduation = EditedInfo?.graduation;
      info.institution = EditedInfo?.institution;
      info.description = EditedInfo?.description;
      info.startDateMonth = EditedInfo?.startDateMonth;
      info.startDateYear = EditedInfo?.startDateYear;
      // If CheckBox checked, no endDate
      if (!isChecked) {
        info.endDateMonth = EditedInfo?.endDateMonth;
        info.endDateYear = EditedInfo?.endDateYear;
      } else {
        info.endDateMonth = 0;
        info.endDateYear = 0;
      }

      if (info.id == -1) {
        dispatch(createAcademic(info));
      } else {
        dispatch(updateAcademic(info));
      }
      navigation.goBack();
    } catch (error) {
      setError("Algo deu errado, tente mais tarde");
      console.log(
        `EditAcademicInfo.handleEditAcademic: Exception=${JSON.stringify(
          error
        )}`
      );
    }
  };

  const debouncedCancelEdit = useDebouncedCallback(
    () => handleCancelEditAcademic(),
    1000
  );

  const handleCancelEditAcademic = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.log(
        `EditAcademicInfo.handleCancelEditAcademic: Exception=${JSON.stringify(
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
              {t("EditAcademicInfo.title")}
            </Text>
          </View>
          {/* Graduation */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-12 mb-0 mt-2`}
          >
            <Controller
              control={control}
              name="graduation"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black text-center"
                  placeholder={t("EditAcademicInfo.graduation")}
                  placeholderTextColor="#9E9E9E"
                  defaultValue={info?.graduation}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.graduation && (
            <Text className="text-[#FF5252] mb-2">
              {" "}
              {errors?.graduation?.message}{" "}
            </Text>
          )}
          {/* Institution */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-12 mb-0 mt-4`}
          >
            <Controller
              control={control}
              name="institution"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black text-center"
                  placeholder={t("EditAcademicInfo.institution")}
                  placeholderTextColor="#9E9E9E"
                  defaultValue={info?.institution}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.institution && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.institution?.message}
            </Text>
          )}
          {/* Start Date Fields */}
          <View className="w-4/5">
            <View className="flex-row w-4/5 mt-4 mb-2">
              <Text>{t("EditAcademicInfo.startDate")}</Text>
            </View>
            <View className="flex-row w-4/5">
              {/* Start Month */}
              <View
                className={`w-1/4 rounded-lg ${
                  Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
                } px-2 mr-4 justify-center h-12 shadow-black text-black bg-[#F0F0F0]`}
              >
                <Controller
                  control={control}
                  name="startDateMonth"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      keyboardType="numeric"
                      className="h-10 text-black text-center"
                      placeholder={t("Month")}
                      placeholderTextColor="#9E9E9E"
                      defaultValue={
                        info.startDateMonth != 0
                          ? info.startDateMonth.toString()
                          : ""
                      }
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
              {/* Start Year */}
              <View
                className={`w-2/5 rounded-lg ${
                  Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
                } px-2  justify-center h-12 shadow-black text-black bg-[#F0F0F0]`}
              >
                <Controller
                  control={control}
                  name="startDateYear"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      keyboardType="numeric"
                      className="h-10 text-black text-center"
                      placeholder={t("Year")}
                      placeholderTextColor="#9E9E9E"
                      defaultValue={
                        info.startDateYear != 0
                          ? info.startDateYear.toString()
                          : ""
                      }
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
            </View>
            {errors.startDateMonth && (
              <Text className="text-[#FF5252]">
                {errors?.startDateMonth?.message}
              </Text>
            )}
            {errors.startDateYear && (
              <Text className="text-[#FF5252]">
                {errors?.startDateYear?.message}
              </Text>
            )}
          </View>
          {/* CheckBox stillWorkHere */}
          <View className="flex-row w-4/5 mt-4">
            <Controller
              control={control}
              name="stillWorkHere"
              render={({ field: { onChange, onBlur, value } }) => (
                <Checkbox
                  className="mr-2"
                  value={isChecked}
                  onValueChange={(value) => {
                    onChange(value);
                    setChecked(value);
                  }}
                  color={isChecked ? "#42A5F5" : undefined}
                />
              )}
            />
            <Text>{t("EditAcademicInfo.stillWorkHere")}</Text>
          </View>
          {/* End Date fields */}
          {!isChecked && (
            <View className="w-4/5">
              <View className="flex-row w-4/5 mt-4 mb-2">
                <Text>{t("EditAcademicInfo.endDate")}</Text>
              </View>
              <View className="flex-row w-4/5">
                {/* End Month */}
                <View
                  className={`w-1/4 rounded-lg ${
                    Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
                  } px-2 mr-4 justify-center h-12 shadow-black text-black bg-[#F0F0F0]`}
                >
                  <Controller
                    control={control}
                    name="endDateMonth"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        keyboardType="numeric"
                        className="h-10 text-black text-center"
                        placeholder={t("Month")}
                        placeholderTextColor="#9E9E9E"
                        defaultValue={
                          info.endDateMonth != 0
                            ? info.endDateMonth.toString()
                            : ""
                        }
                        onChangeText={onChange}
                      />
                    )}
                  />
                </View>
                {/* End Year */}
                <View
                  className={`w-2/5 rounded-lg ${
                    Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
                  } px-2  justify-center h-12 shadow-black text-black bg-[#F0F0F0]`}
                >
                  <Controller
                    control={control}
                    name="endDateYear"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        keyboardType="numeric"
                        className="h-10 text-black text-center"
                        placeholder={t("Year")}
                        placeholderTextColor="#9E9E9E"
                        defaultValue={
                          info.endDateYear != 0
                            ? info.endDateYear.toString()
                            : ""
                        }
                        onChangeText={onChange}
                      />
                    )}
                  />
                </View>
              </View>
              {errors.endDateMonth && (
                <Text className="text-[#FF5252]">
                  {" "}
                  {errors?.endDateMonth?.message}{" "}
                </Text>
              )}
              {errors.endDateYear && (
                <Text className="text-[#FF5252]">
                  {" "}
                  {errors?.endDateYear?.message}{" "}
                </Text>
              )}
            </View>
          )}
          {/* Description */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-36 mb-0 mt-4`}
          >
            <Controller
              control={control}
              name="description"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-36 text-black text-center"
                  multiline={true}
                  placeholder={t("EditAcademicInfo.description")}
                  placeholderTextColor="#9E9E9E"
                  defaultValue={info?.description}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.description && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.description?.message}
            </Text>
          )}
          {/* Submit Button */}
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#42A5F5] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-8 mb-0`}
            onPress={handleSubmit(debouncedEditAcademicInfo)}
          >
            <Text className="text-white">{t("Salvar")}</Text>
          </TouchableOpacity>
          {errorMessage != "" && (
            <Text className="text-[#c3a040] mb-2 mt-2">*{errorMessage}</Text>
          )}
          {/* Cancel Button */}
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#fb5b5a] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-2 mb-0`}
            onPress={debouncedCancelEdit}
          >
            <Text className="text-white">{t("Cancelar")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditAcademicInfo;
