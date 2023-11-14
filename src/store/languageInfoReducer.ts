import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILanguageInfo } from '../utils/DataTypes';
import { Axios_API } from '../Api';
// import { showMessage } from 'react-native-flash-message';

export const getLanguage = createAsyncThunk("getLanguage", async () => {
  const result = await Axios_API.get("/language");
  return { ...result.data };
});

export const createLanguage = createAsyncThunk("createLanguage", async (data: ILanguageInfo) => {
//   showMessage({ message: "Enviando informações", type: "info" });
  const result = await Axios_API.post("/language", data);
  return { ...result.data.language };
});

export const updateLanguage = createAsyncThunk("updateLanguage", async (data: ILanguageInfo) => {
//   showMessage({ message: "Enviando atualização", type: "info" });
  const result = await Axios_API.patch("/language", data);
  return { ...result.data.language };
});

export const deleteLanguage = createAsyncThunk("deleteLanguage", async (data: Number) => {
//   showMessage({ message: "Excluindo", type: "info" });
  const result = await Axios_API.delete(`/language/${data}`);
  return { ...result.data.result, id: data };
});

// Slice to handle resume information about Language Experiences
const LanguageInfoSlice = createSlice({
  name: 'Languageinfo',
  initialState: { lInfoArray: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getLanguage.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao obter proficiências em línguas", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(getLanguage.fulfilled, (state, action) => {
      state.isLoading = false;
      const NewState = [...action.payload.languageInfos];
      const Values = NewState.map((tempstate) => {
        return { ...tempstate };
      });
      state.lInfoArray = [...Values];
      return state;
    });
    builder.addCase(createLanguage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createLanguage.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao enviar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(createLanguage.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações enviadas", type: "success", duration: 1000 });
      state.isLoading = false;
      const NewInfo = { ...action.payload };
      state.lInfoArray = [...state.lInfoArray, NewInfo];
      return state;
    });
    builder.addCase(updateLanguage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateLanguage.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao atualizar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(updateLanguage.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações atualizadas", type: "success", duration: 1000 });
      state.isLoading = false;
      const EditedInfo = { ...action.payload } as ILanguageInfo;
      const index = state.lInfoArray.findIndex((value) => value.id === EditedInfo.id);
      if (index === -1)
        return;
      state.lInfoArray[index] = { ...EditedInfo };
      state.lInfoArray = [...state.lInfoArray];
    });
    builder.addCase(deleteLanguage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteLanguage.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao excluir as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(deleteLanguage.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações excluídas", type: "success", duration: 1000 });
      state.isLoading = false;
      const result = action.payload;
      if (result?.message == "Success") {
        var indexToDelete: number;
        state.lInfoArray.forEach((value, index) => { if (value.id == result?.id) { indexToDelete = index; return; } });
        if (indexToDelete > -1) {
          state.lInfoArray.splice(indexToDelete, 1);
          state.lInfoArray = [...state.lInfoArray];
        } else {
          console.error("Tried to remove an LanguageInfo, but id not found");
        };
      };
    });
  },
});

export const LanguageInfoReducer = LanguageInfoSlice.reducer;