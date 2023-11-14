import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAcademicInfo } from '../utils/DataTypes';
import { Axios_API } from '../Api';
// import { showMessage } from 'react-native-flash-message';

export const getAcademic = createAsyncThunk("getAcademic", async () => {
  const result = await Axios_API.get("/academic");
  return { ...result.data };
});

export const createAcademic = createAsyncThunk("createAcademic", async (data: IAcademicInfo) => {
//   showMessage({ message: "Enviando informações", type: "info" });
  const result = await Axios_API.post("/academic", data);
  return { ...result.data.academic };
});

export const updateAcademic = createAsyncThunk("updateAcademic", async (data: IAcademicInfo) => {
//   showMessage({ message: "Enviando atualização", type: "info" });
  const result = await Axios_API.patch("/academic", data);
  return { ...result.data.academic };
});

export const deleteAcademic = createAsyncThunk("deleteAcademic", async (data: Number) => {
//   showMessage({ message: "Excluindo", type: "info" });
  const result = await Axios_API.delete(`/academic/${data}`);
  return { ...result.data.result, id: data };
});

// Slice to handle resume information about Academic Experiences
const academicInfoSlice = createSlice({
  name: 'academicinfo',
  initialState: { aInfoArray: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAcademic.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAcademic.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao obter as experiências acadêmicas", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(getAcademic.fulfilled, (state, action) => {
      state.isLoading = false;
      const NewState = [...action.payload.academicInfos];
      const Values = NewState.map((tempstate) => {
        return { ...tempstate };
      });
      state.aInfoArray = [...Values];
      return state;
    });
    builder.addCase(createAcademic.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createAcademic.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao enviar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(createAcademic.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações enviadas", type: "success", duration: 1000 });
      state.isLoading = false;
      const NewInfo = { ...action.payload };
      state.aInfoArray = [...state.aInfoArray, NewInfo];
      return state;
    });
    builder.addCase(updateAcademic.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAcademic.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao atualizar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(updateAcademic.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações atualizadas", type: "success", duration: 1000 });
      state.isLoading = false;
      const EditedInfo = { ...action.payload } as IAcademicInfo;
      const index = state.aInfoArray.findIndex((value) => value.id === EditedInfo.id);
      if (index === -1)
        return;
      state.aInfoArray[index] = { ...EditedInfo };
      state.aInfoArray = [...state.aInfoArray];
    });
    builder.addCase(deleteAcademic.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAcademic.rejected, (state, action) => {
    //   showMessage({ message: "Ocorreu algum erro ao excluir as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(deleteAcademic.fulfilled, (state, action) => {
    //   showMessage({ message: "Informações excluídas", type: "success", duration: 1000 });
      state.isLoading = false;
      const result = action.payload;
      if (result?.message == "Success") {
        var indexToDelete: number;
        state.aInfoArray.forEach((value, index) => { if (value.id == result?.id) { indexToDelete = index; return; } });
        if (indexToDelete > -1) {
          state.aInfoArray.splice(indexToDelete, 1);
          state.aInfoArray = [...state.aInfoArray];
        } else {
          console.error("Tried to remove an AcademicInfo, but id not found");
        };
      };
    });
  },
});

export const academicInfoReducer = academicInfoSlice.reducer;