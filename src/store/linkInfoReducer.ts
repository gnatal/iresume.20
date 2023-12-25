import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILinkInfo, ISkillInfo } from '../utils/DataTypes';
import { Axios_API } from '../Api';
// import { showMessage } from 'react-native-flash-message';

export const getLink = createAsyncThunk("getLink", async () => {
  const result = await Axios_API.get("/link");
  return { ...result.data };
});

export const createLink = createAsyncThunk("createLink", async (data: ILinkInfo) => {
//   showMessage({ message: "Enviando informações", type: "info" });
  const result = await Axios_API.post("/link", data);
  return { ...result.data.link };
});

export const updateLink = createAsyncThunk("updateLink", async (data: ILinkInfo) => {
//   showMessage({ message: "Enviando atualização", type: "info" });
  const result = await Axios_API.patch("/link", data);
  return { ...result.data.link };
});

export const deleteLink = createAsyncThunk("deleteLink", async (data: Number) => {
//   showMessage({ message: "Excluindo", type: "info" });
  const result = await Axios_API.delete(`/link/${data}`);
  return { ...result.data.result, id: data };
});

// Slice to handle resume information about Link Experiences
const LinkInfoSlice = createSlice({
  name: 'Linkinfo',
  initialState: { sInfoArray: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLink.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getLink.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao obter as habilidades", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(getLink.fulfilled, (state, action) => {
      state.isLoading = false;
      const skillInfos = [...action.payload.skillInfos];
      const Values = skillInfos.map((tempstate) => {
        return { ...tempstate };
      });
      state.sInfoArray = [...Values];
      return state;
    });
    builder.addCase(createLink.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createLink.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao enviar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(createLink.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações enviadas", type: "success", duration: 1000 });
      state.isLoading = false;
      state.sInfoArray = [...state.sInfoArray, { ...action.payload }];
      return state;
    });
    builder.addCase(updateLink.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateLink.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao atualizar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(updateLink.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações atualizadas", type: "success", duration: 1000 });
      state.isLoading = false;
      const EditedInfo = { ...action.payload } as ILinkInfo;
      const index = state.sInfoArray.findIndex((value) => value.id === EditedInfo.id);
      if (index === -1)
        return;
      state.sInfoArray[index] = { ...EditedInfo };
      state.sInfoArray = [...state.sInfoArray];
      return state;
    });
    builder.addCase(deleteLink.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteLink.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao excluir as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(deleteLink.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações excluídas", type: "success", duration: 1000 });
      state.isLoading = false;
      const result = action.payload;
      if (result?.message == "Success") {
        var indexToDelete: number;
        state.sInfoArray.forEach((value, index) => { if (value.id == result?.id) { indexToDelete = index; return; } });
        if (indexToDelete > -1) {
          state.sInfoArray.splice(indexToDelete, 1);
          state.sInfoArray = [...state.sInfoArray];
        } else {
          console.error("Tried to remove an LinkInfo, but id not found");
        };
      };
    });
  }
});

export const LinkInfoReducer = LinkInfoSlice.reducer;