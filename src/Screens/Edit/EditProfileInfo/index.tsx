import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  updateProfile,
  updateProfileBasicInfo,
  updateProfilePhoto,
} from "../../../store/profileInfoReducer";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToBucket } from "../../../Services/uploadImageToBucket";
import Loading from "../../../Components/Basics/Loading";
import { showMessage } from "react-native-flash-message";
import { EditButton } from "../../../Components/Basics/EditButtons";
import * as FileSystem from "expo-file-system";
import { useDebouncedCallback } from "use-debounce";

const profileSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required().min(8),
  address: yup.string(),
  description: yup.string(),
});

function EditProfileInfo({ navigation }: any) {
  const profileInfoRedux = useSelector((state: RootState) => state.profileinfo);
  const dispatch = useDispatch<any>();
  const [photo, setPhoto] = useState(null);
  const debounceCancel = useDebouncedCallback(() => handleCancel(), 500);
  const debounceEditProfile = useDebouncedCallback((profile: any) => {
    handleEditProfile({ ...profile });
  }, 500);

  useEffect(() => {
    if (profileInfoRedux?.photo) {
      setPhoto(profileInfoRedux?.photo);
    }
  }, [profileInfoRedux]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: profileInfoRedux?.name,
      email: profileInfoRedux?.email,
      phone: profileInfoRedux?.phone,
      address: profileInfoRedux?.address || "",
      description: profileInfoRedux?.description || "",
    },
  });

  if (profileInfoRedux?.isLoading) return <Loading />;

  const uploadImageToS3 = async () => {
    try {
      let location = await uploadImageToBucket(photo);
      if (location) {
        location = location + `?date=${Date.now()}`;
        setPhoto(location);
        dispatch(updateProfilePhoto({ photo: location }));
      }
      // Append date so the app always reload image when a new picture is sent
      return location;
    } catch (error) {
      console.error("uploadImageToS3:", error);
      return "";
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleEditProfile = async ({
    name,
    email,
    phone,
    address,
    description,
  }: any) => {
    try {
      let newImageLink = "";
      if (photo && photo != profileInfoRedux?.photo)
        newImageLink = await uploadImageToS3();
      dispatch(
        updateProfile({
          name,
          email,
          phone,
          description,
          address,
          pictureLink: newImageLink || profileInfoRedux?.photo,
        })
      );
      dispatch(
        updateProfileBasicInfo({ name, email, phone, address, description })
      );
      navigation.goBack();
    } catch (error) {
      console.log(
        `Profile.handleEditProfile: Exception=${JSON.stringify(error)}`
      );
    }
  };

  const handleChoosePhoto = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.6,
      });

      if (!result.canceled) {
        const fileUri = result.assets[0].uri;
        const fileInfo = await FileSystem.getInfoAsync(fileUri, { size: true });
        // Check if file exists (consistency)
        if (fileInfo.exists) {
          const fileSize = fileInfo?.size;
          // 2mb file size limit
          if (fileSize < 2 * 1024 * 1024) {
            setPhoto(fileUri);
          } else {
            const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
            showMessage({
              message: "Imagem supera o tamanho máximo permitido",
              description: `Máximo permitido de 2MB (tamanho do arquivo ${fileSizeMB}MB)`,
              type: "warning",
              duration: 5000,
            });
          }
        } else {
          showMessage({
            message: "Ocorreu um problema ao selecionar a imagem",
            type: "danger",
          });
        }
      }
    } catch (error) {
      console.log("handleChoosePhoto:", error);
    }
  };

  return (
    <ScrollView className="mt-10">
      <View className="flex flex-col items-center w-screen h-auto bg-[#f2f2f2]">
        <View className="bg-[#F5F5F5] w-4/5 mt-10 items-center rounded-xl">
          {/* Uses one of the three image options below */}
          {photo && (
            <Image className="w-full h-60 rounded-xl" source={{ uri: photo }} />
          )}
          {!photo && profileInfoRedux?.photo && (
            <Image
              className="w-full h-60 rounded-xl"
              source={{ uri: profileInfoRedux?.photo }}
            />
          )}
          {!photo && !profileInfoRedux?.photo && (
            <Image
              className="w-full rounded-xl"
              source={require("../../../../assets/AvatarPicture.png")}
            />
          )}
          <EditButton
            className="absolute bottom-[-10] right-[-10]"
            onPress={handleChoosePhoto}
          />
        </View>
        <View
          className={`bg-[#F5F5F5] w-4/5 pb-10 mb-10 mt-10 border-2 items-center border-solid  rounded-xl border-[#9FC0C7] ${
            Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
          } shadow-black`}
        >
          <View className="w-80 rounded-3xl h-14 flex items-center justify-center mt-10 mb-4 ">
            <Text className="text-black text-lg">Informações de contato</Text>
          </View>
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
            } shadow-black px-2 justify-center h-12 mb-0 mt-2`}
          >
            <Controller
              control={control}
              name="name"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black text-center"
                  placeholder="Nome"
                  placeholderTextColor="#9E9E9E"
                  defaultValue={profileInfoRedux?.name}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.name && (
            <Text className="text-[#FF5252] mb-2">{errors?.name?.message}</Text>
          )}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
            } shadow-black px-2 justify-center min-h-12 mb-0 mt-4`}
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-12 text-black text-center"
                  placeholder="Email"
                  placeholderTextColor="#9E9E9E"
                  defaultValue={profileInfoRedux?.email}
                  autoCapitalize="none"
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.email && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.email?.message}
            </Text>
          )}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
            } shadow-black px-2 justify-center h-12 mb-0 mt-4`}
          >
            <Controller
              control={control}
              name="phone"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black text-center"
                  placeholder="Telefone"
                  placeholderTextColor="#9E9E9E"
                  defaultValue={profileInfoRedux?.phone}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.phone && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.phone?.message}
            </Text>
          )}
          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
            } shadow-black px-2 justify-center h-12 mb-0 mt-4`}
          >
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-10 text-black text-center"
                  placeholder="Endereço"
                  placeholderTextColor="#9E9E9E"
                  defaultValue={profileInfoRedux?.address || ""}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.address && (
            <Text className="text-[#FF5252] mb-2">
              {errors?.address?.message}
            </Text>
          )}

          <View
            className={`w-4/5 text-black bg-[#F0F0F0] rounded-lg ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
            } shadow-black px-2 justify-center max-h-36 mb-0 mt-4`}
            style={{ minHeight: 48 }}
          >
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-auto text-black text-center m-1"
                  multiline={true}
                  placeholder="Descrição"
                  placeholderTextColor="#9E9E9E"
                  defaultValue={profileInfoRedux?.description || ""}
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

          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#42A5F5] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-8 mb-0`}
            onPress={handleSubmit(debounceEditProfile)}
          >
            <Text className="text-white">Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`h-12 w-4/5 bg-[#fb5b5a] justify-center rounded-lg items-center ${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            } shadow-black mt-2 mb-0`}
            onPress={debounceCancel}
          >
            <Text className="text-white">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditProfileInfo;
