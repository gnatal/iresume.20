import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios_API } from "../Api";
import { IProfileInfo } from "../utils/DataTypes";
// import { showMessage } from "react-native-flash-message";

const uInfo: IProfileInfo = {
    name: "",
    email: "",
    phone: "",
    photo: "",
    pdfLink: "",
    description: "",
    address: "",
  };

export const getProfile = createAsyncThunk("getProfile", async () => {
  const result = await Axios_API.get("/profile");
  return { ...result.data.profile };
});

export const updateProfile = createAsyncThunk("updateProfile", async (data: any) => {
//   showMessage({ message: "Enviando atualização", type: "info" });
  const result = await Axios_API.patch("/profile", data);
  return { ...result.data.profile };
});

// Slice to handle resume information about the user
const profileInfoSlice = createSlice({
  name: "profileinfo",
  initialState: { ...uInfo, isLoading: false },
  reducers: {
    updateProfileBasicInfo: (state, action: PayloadAction<IProfileInfo>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.description = action.payload.description;
    },
    updateProfilePhoto: (state, action) => {
      state.photo = action.payload?.photo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao atualizar as informações", type: "danger" });
      state.isLoading = false
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações atualizadas", type: "success", duration: 1000 });
      state.isLoading = false
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.photo = action.payload.pictureLink;
      state.pdfLink = action.payload.pdfLink;
      state.address = action.payload.address;
      state.description = action.payload.description;
    });
    builder.addCase(getProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao obter as informações do usuário", type: "danger" });
      state.isLoading = false
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.photo = action.payload.pictureLink;
      state.pdfLink = action.payload.pdfLink;
      state.address = action.payload.address;
      state.description = action.payload.description;
    });
  },
});

export const { updateProfileBasicInfo, updateProfilePhoto } = profileInfoSlice.actions;
export const profileInfoReducer = profileInfoSlice.reducer;
