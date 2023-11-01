import React from "react";
import { Text, View, Image, Platform } from "react-native";
import { IProfileInfoProps } from "../../utils/DataTypes";
import { EditButton } from "../Basics/EditButtons";
import { FadePanel } from "../Basics/FadePanel";

const Box = ({ className = "", ...props }) => (
  <View
    className={`flex text-center justify-center items-center rounded-lg ${
      Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
    } shadow-black px-2 bg-[#F0F0F0] ${className}`}
    {...props}
  />
);
const TextFields = ({ className = "", ...props }) => (
  <Text
    className={`text-[#9E9E9E] text-center items-center ${className}`}
    {...props}
  />
);
const ProfileInfo: React.FC<IProfileInfoProps> = ({
  ProfileInfo,
  Edit,
  navigation,
}) => {
  return (
    <View>
      <View
        className={`w-4/5 mt-10 p-1 items-center rounded-xl ${
          Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
        } shadow-black bg-[#F5F5F5]`}
      >
        {/* Inside BOX */}
        <View className="flex flex-row mx-2">
          <View className="basis-1/3 my-1 p-1 justify-center">
            <Box className="basis-full m-1 h-40 px-0">
              {/*  ${Platform.OS === 'ios' ? 'rounded-xl' : 'rounded-lg'} */}
              <Image
                className={`h-full w-full rounded-lg ${
                  Platform.OS === "ios" ? "rounded-xl" : ""
                }`}
                source={
                  ProfileInfo?.photo != ""
                    ? { uri: ProfileInfo?.photo }
                    : require("../../../assets/default-profile-picture.png")
                }
              />
            </Box>
          </View>
          <View className="basis-2/3 p-1 justify-center">
            <Box className="basis-full m-1 h-8">
              <TextFields>{ProfileInfo?.name}</TextFields>
            </Box>
            <Box className="basis-full m-1 h-8">
              <TextFields>{ProfileInfo?.email}</TextFields>
            </Box>
            <Box className="basis-full m-1 h-8">
              <TextFields>{ProfileInfo?.phone}</TextFields>
            </Box>
            <Box className="basis-full m-1 h-8">
              <TextFields>{ProfileInfo?.address}</TextFields>
            </Box>
          </View>
        </View>
        <View className="flex flex-row mx-2 mb-2">
          <View className="basis-full p-1 justify-center">
            <Box className="basis-full h-auto" style={{ minHeight: 32 }}>
              <TextFields>{ProfileInfo?.description}</TextFields>
            </Box>
          </View>
        </View>
      </View>
      <FadePanel visible={Edit}>
        <EditButton
          disabled={!Edit}
          className="absolute bottom-[-10] right-[-10]"
        //   onPress={() => {
        //     navigation.navigate("EditProfileInfo");
        //   }}
        />
      </FadePanel>
    </View>
  );
};

export default ProfileInfo;
