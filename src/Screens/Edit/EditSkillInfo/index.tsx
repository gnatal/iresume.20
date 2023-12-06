import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SkillInfoSchema } from "../../../Components/Yup/Schemas";
import { ScrollView } from "react-native-gesture-handler";
import { ISkillInfo } from "../../../utils/DataTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  createSkill,
  updateSkill,
} from "../../../store/skillInfoReducer";
import Slider from "@react-native-community/slider";
import { useDebouncedCallback } from "use-debounce";
import i18n from "../../../i18n/i18n";


function EditSkillInfo({ route, navigation }: any) {
  const skillInfoRedux = useSelector((state: RootState) => state.skillinfo.sInfoArray);
  const dispatch = useDispatch<any>();
  const [errorMessage, setError] = useState("");
  const appLanguage = useSelector((state: any) => state.appLanguage.value);
  i18n.changeLanguage(appLanguage)
  const t = i18n.t
  // Get the info ID from route params
  const infoID: Number = route.params?.infoID || -1;
  // Fetch info from global example array, if exist
  var info: ISkillInfo = undefined;
  if (infoID != -1)
    skillInfoRedux.forEach((value) => {
      if (value.id == infoID) info = { ...value };
    });
  // If info undefined, set Default empty params
  if (!info) info = { id: -1, skill: "", level: 0 };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SkillInfoSchema(t)),
    defaultValues: {
      // Set Default form values for Yup
      skill: info.skill,
      level: info.level,
    },
  });

  const debouncedEditSkill = useDebouncedCallback(
    (EditedInfo: any) => handleEditSkill(EditedInfo)
    ,1000
  )

  const handleEditSkill = async (EditedInfo: any) => {
    try {
      // Set info with incoming form values
      info.skill = EditedInfo?.skill;
      info.level = EditedInfo?.level;

      if (info.id == -1) {
        dispatch(createSkill(info));
      } else {
        dispatch(updateSkill(info));
      }
      navigation.goBack();
    } catch (error) {
      setError("Algo deu errado, tente mais tarde");
      console.log(
        `EditSkillInfo.handleEditSkill: Exception=${JSON.stringify(error)}`
      );
    }
  };

  const debouncedCancel = useDebouncedCallback(
    () => handleCancelEditSkill()
    ,1000
  )

  const handleCancelEditSkill = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.log(
        `EditSkillInfo.handleCancelEditSkill: Exception=${JSON.stringify(
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
              {t("EditSkillInfo.title")}
            </Text>
          </View>
          {/* Skill */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-24 mb-2 mt-0`}
          >
            <Controller
              control={control}
              name="skill"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="items-center justify-center">
                  <TextInput
                    className="h-10 text-black text-center"
                    placeholder={t("EditSkillInfo.placeholder")}
                    placeholderTextColor="#9E9E9E"
                    defaultValue={info?.skill}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          </View>
          {errors.skill && (
            <Text className="text-[#FF5252] mb-2">
              {" "}
              {errors?.skill?.message}{" "}
            </Text>
          )}
          {/* Institution */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-32 mb-0 mt-4`}
          >
            <Controller
              control={control}
              name="level"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text className={"m-auto py-2 font-black"}> {value}</Text>
                  <Slider
                    className="m-auto"
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={value}
                    minimumTrackTintColor="#42A5F5"
                    maximumTrackTintColor="#000000"
                    onValueChange={onChange}
                  />
                </View>
              )}
            />
            <View className="flex ml-2 flex-row justify-between py-2">
              <Text>0</Text>
              <Text>100</Text>
            </View>
          </View>
          {errors.level && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.level?.message}
            </Text>
          )}
          {/* Submit Button */}
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#42A5F5] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-8 mb-0`}
            onPress={handleSubmit(debouncedEditSkill)}
          >
            <Text className="text-white">Salvar</Text>
          </TouchableOpacity>
          {errorMessage != "" && (
            <Text className="text-[#c3a040] mb-2 mt-2">*{errorMessage}</Text>
          )}
          {/* Cancel Button */}
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#fb5b5a] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-2 mb-0`}
            onPress={debouncedCancel}
          >
            <Text className="text-white">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditSkillInfo;
