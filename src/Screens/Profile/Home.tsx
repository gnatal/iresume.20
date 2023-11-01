import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProfileInfo from "../../Components/Profile/ProfileInfo";
import AcademicInfo from "../../Components/Profile/AcademicInfo";
import ProfessionalInfo from "../../Components/Profile/ProfessionalInfo";
import LanguageInfo from "../../Components/Profile/LanguageInfo";
import SkillInfo from "../../Components/Profile/SkillInfo";
import { ToggleEditButton } from "../../Components/Basics/EditButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function HomeScreen({ navigation }: any) {
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
  const [showEdit, setEdit] = useState<Boolean>(false);

  const handleToggleEditButton = () => {
    setEdit(!showEdit);
  };  

  return (
    <View>
      <ScrollView className="mt-10">
        <View className="flex flex-col items-center w-screen h-auto bg-[#f2f2f2] mb-24">
          <ProfileInfo
            ProfileInfo={profileInfoRedux}
            Edit={showEdit}
            navigation={navigation}
          />
          <AcademicInfo
            AcademicInfoArray={academicInfoRedux.aInfoArray}
            Edit={showEdit}
            navigation={navigation}
          />
          <ProfessionalInfo
            ProfessionalInfoArray={professionalInfoRedux.pInfoArray}
            Edit={showEdit}
            navigation={navigation}
          />
          <LanguageInfo
            LanguageInfoArray={languageInfoRedux.lInfoArray}
            Edit={showEdit}
            navigation={navigation}
          />
          <SkillInfo
            SkillInfoArray={skillInfoRedux.sInfoArray}
            Edit={showEdit}
            navigation={navigation}
          />
        </View>
      </ScrollView>
      <ToggleEditButton
        className="absolute right-5 bottom-10"
        Edit={showEdit}
        onPress={handleToggleEditButton}
      />
    </View>
  );
}

export default HomeScreen;
