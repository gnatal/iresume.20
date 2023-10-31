import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProfessionalInfo } from "../utils/DataTypes";
import { Axios_API } from "../Api";
// import { showMessage } from 'react-native-flash-message';

export const getProfessional = createAsyncThunk("getProfessional", async () => {
  const result = await Axios_API.get("/professional");
  return { ...result.data };
});

export const createProfessional = createAsyncThunk(
  "createProfessional",
  async (data: IProfessionalInfo) => {
    //   showMessage({ message: "Enviando informações", type: "info" });
    const result = await Axios_API.post("/professional", data);
    return { ...result.data.professional };
  }
);

export const updateProfessional = createAsyncThunk(
  "updateProfessional",
  async (data: IProfessionalInfo) => {
    //   showMessage({ message: "Enviando atualização", type: "info" });
    const result = await Axios_API.patch("/professional", data);
    return { ...result.data.professional };
  }
);

export const deleteProfessional = createAsyncThunk(
  "deleteProfessional",
  async (data: Number) => {
    //   showMessage({ message: "Excluindo", type: "info" });
    const result = await Axios_API.delete(`/professional/${data}`);
    return { ...result.data.result, id: data };
  }
);

const initialState = {
  isLoading: false,
  pInfoArray: [] as Array<IProfessionalInfo>,
};

// Slice to handle resume information about Professional Experiences
const professionalInfoSlice = createSlice({
  name: "professionalinfo",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfessional.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProfessional.rejected, (state, action) => {
      //   showMessage({ message: "Ocorreu algum erro ao obter as experiências profissionais", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(getProfessional.fulfilled, (state, action) => {
      state.isLoading = false;
      const NewState = [...action.payload.professionalInfos];
      const Values = NewState.map((tempstate) => {
        return { ...tempstate };
      });
      state.pInfoArray = [...Values];
      return state;
    });
    builder.addCase(createProfessional.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProfessional.rejected, (state, action) => {
      //   showMessage({ message: "Ocorreu algum erro ao enviar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(createProfessional.fulfilled, (state, action) => {
      //   showMessage({ message: "Informações enviadas", type: "success", duration: 1000 });
      state.isLoading = false;
      const NewInfo = { ...action.payload };
      state.pInfoArray = [...state.pInfoArray, NewInfo];
      return state;
    });
    builder.addCase(updateProfessional.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfessional.rejected, (state, action) => {
      //   showMessage({ message: "Ocorreu algum erro ao atualizar as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(updateProfessional.fulfilled, (state, action) => {
      //   showMessage({ message: "Informações atualizadas", type: "success", duration: 1000 });
      state.isLoading = false;
      const EditedInfo = { ...action.payload } as IProfessionalInfo;
      const index = state.pInfoArray.findIndex(
        (value) => value.id === EditedInfo.id
      );
      if (index === -1) return;
      state.pInfoArray[index] = { ...EditedInfo };
      state.pInfoArray = [...state.pInfoArray];
    });
    builder.addCase(deleteProfessional.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProfessional.rejected, (state, action) => {
      //   showMessage({ message: "Ocorreu algum erro ao excluir as informações", type: "danger" });
      state.isLoading = false;
    });
    builder.addCase(deleteProfessional.fulfilled, (state, action) => {
      //   showMessage({ message: "Informações excluídas", type: "success", duration: 1000 });
      state.isLoading = false;
      const result = action.payload;
      if (result?.message == "Success") {
        var indexToDelete: number;
        state.pInfoArray.forEach((value, index) => {
          if (value.id == result?.id) {
            indexToDelete = index;
            return;
          }
        });
        if (indexToDelete > -1) {
          state.pInfoArray.splice(indexToDelete, 1);
          state.pInfoArray = [...state.pInfoArray];
        } else {
          console.error(
            "Tried to remove an ProfessionalInfo, but id not found"
          );
        }
      }
    });
  },
});

export const ProfessionalInfoReducer = professionalInfoSlice.reducer;
