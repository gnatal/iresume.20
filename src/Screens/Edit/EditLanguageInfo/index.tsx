import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LanguageInfoSchema } from "../../../Components/Yup/Schemas";
import { ScrollView } from "react-native-gesture-handler";
import { ILanguageInfo, Languages } from "../../../utils/DataTypes";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  createLanguage,
  updateLanguage,
} from "../../../store/languageInfoReducer";
import Slider from "@react-native-community/slider";
import { useDebouncedCallback } from "use-debounce";

function EditLanguageInfo({ route, navigation }: any) {
  const languageInfoRedux = useSelector(
    (state: RootState) => state.languageinfo.lInfoArray
  );
  const dispatch = useDispatch<any>();
  const [errorMessage, setError] = useState("");
  // Get the info ID from route params
  const infoID: Number = route.params?.infoID || -1;
  // Fetch info from global example array, if exist
  var info: ILanguageInfo = undefined;
  if (infoID != -1)
    languageInfoRedux.forEach((value) => {
      if (value.id == infoID) info = { ...value };
    });
  // If info undefined, set Default empty params
  if (!info) info = { id: -1, language: Languages.pt, level: 0 };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(LanguageInfoSchema),
    defaultValues: {
      // Set Default form values for Yup
      language: info.language,
      level: info.level,
    },
  });

  const debouncedEditLanguage = useDebouncedCallback(
    (EditedInfo: any) => handleEditLanguage(EditedInfo),
    1000
  );

  const handleEditLanguage = async (EditedInfo: any) => {
    try {
      // Set info with incoming form values
      info.language = EditedInfo?.language;
      info.level = EditedInfo?.level;

      if (info.id == -1) {
        dispatch(createLanguage(info));
      } else {
        dispatch(updateLanguage(info));
      }
      navigation.goBack();
    } catch (error) {
      setError("Algo deu errado, tente mais tarde");
      console.log(
        `EditLanguageInfo.handleEditLanguage: Exception=${JSON.stringify(
          error
        )}`
      );
    }
  };

  const debouncedCancel = useDebouncedCallback(
    () => handleCancelEditLanguage(),
    1000
  );

  const handleCancelEditLanguage = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.log(
        `EditLanguageInfo.handleCancelEditLanguage: Exception=${JSON.stringify(
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
              {infoID == -1 && "Nova "}Proficiência Linguística
            </Text>
          </View>
          {/* Graduation */}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black px-2 justify-center h-14 mb-0 mt-2`}
          >
            <Controller
              control={control}
              name="language"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="items-center justify-center">
                  <SelectDropdown
                    data={Object.values(Languages)}
                    defaultButtonText={info.language}
                    onSelect={(selectedItem, index) => {
                      onChange(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    dropdownStyle={styles.dropdown}
                  />
                </View>
              )}
            />
          </View>
          {errors.language && (
            <Text className="text-[#FF5252] mb-2">
              {" "}
              {errors?.language?.message}{" "}
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
            onPress={handleSubmit(debouncedEditLanguage)}
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

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
});

export default EditLanguageInfo;
