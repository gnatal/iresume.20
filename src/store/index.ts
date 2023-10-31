import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userLoginReducer } from "./loginReducer";

const rootReducer = combineReducers({
  user: userLoginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
