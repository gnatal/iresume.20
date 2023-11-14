import React, { useEffect } from "react";
import { View } from "react-native";
import Loading from "../../Components/Basics/Loading";
import { useDispatch } from "react-redux";
import { getProfile } from "../../store/profileInfoReducer";
import { getProfessional } from "../../store/professionalInfoReducer";
import { getAcademic } from "../../store/academicInfoReducer";
import { getLanguage } from "../../store/languageInfoReducer";
import { getSkill } from "../../store/skillInfoReducer";

export default function HomeLoading({ navigation }: any) {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    try {
      dispatch(getProfile());
      dispatch(getProfessional());
      dispatch(getAcademic());
      dispatch(getLanguage());
      dispatch(getSkill());
    } catch (error) {
      console.log("handleRequestInfo error", error);
    };
    navigation.navigate("ProfileTab");
  }, []);

  return (
    <View className="flex flex-col items-center h-screen bg-[#f2f2f2]">
      <Loading />
    </View>
  );
};