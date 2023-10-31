import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISkillInfo } from '../utils/DataTypes';
import { Axios_API } from '../Api';
// import { showMessage } from 'react-native-flash-message';

export const getSkill = createAsyncThunk("getSkill", async () => {
  const result = await Axios_API.get("/skill");
  return { ...result.data };
});

export const createSkill = createAsyncThunk("createSkill", async (data: ISkillInfo) => {
//   showMessage({ message: "Enviando informações", type: "info" });
  const result = await Axios_API.post("/skill", data);
  return { ...result.data.skill };
});

export const updateSkill = createAsyncThunk("updateSkill", async (data: ISkillInfo) => {
//   showMessage({ message: "Enviando atualização", type: "info" });
  const result = await Axios_API.patch("/skill", data);
  return { ...result.data.skill };
});

export const deleteSkill = createAsyncThunk("deleteSkill", async (data: Number) => {
//   showMessage({ message: "Excluindo", type: "info" });
  const result = await Axios_API.delete(`/skill/${data}`);
  return { ...result.data.result, id: data };
});

// Slice to handle resume information about Skill Experiences
const SkillInfoSlice = createSlice({
  name: 'Skillinfo',
  initialState: { sInfoArray: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSkill.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSkill.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao obter as habilidades", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(getSkill.fulfilled, (state, action) => {
      state.isLoading = false;
      const skillInfos = [...action.payload.skillInfos];
      const Values = skillInfos.map((tempstate) => {
        return { ...tempstate };
      });
      state.sInfoArray = [...Values];
      return state;
    });
    builder.addCase(createSkill.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createSkill.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao enviar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(createSkill.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações enviadas", type: "success", duration: 1000 });
      state.isLoading = false;
      state.sInfoArray = [...state.sInfoArray, { ...action.payload }];
      return state;
    });
    builder.addCase(updateSkill.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateSkill.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao atualizar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(updateSkill.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações atualizadas", type: "success", duration: 1000 });
      state.isLoading = false;
      const EditedInfo = { ...action.payload } as ISkillInfo;
      const index = state.sInfoArray.findIndex((value) => value.id === EditedInfo.id);
      if (index === -1)
        return;
      state.sInfoArray[index] = { ...EditedInfo };
      state.sInfoArray = [...state.sInfoArray];
      return state;
    });
    builder.addCase(deleteSkill.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSkill.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao excluir as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(deleteSkill.fulfilled, (state, action) => {
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
          console.error("Tried to remove an SkillInfo, but id not found");
        };
      };
    });
  }
});

export const SkillInfoReducer = SkillInfoSlice.reducer;