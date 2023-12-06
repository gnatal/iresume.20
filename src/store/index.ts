import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userLoginReducer } from "./loginReducer";
import { academicInfoReducer } from './academicInfoReducer';
import { LanguageInfoReducer } from './languageInfoReducer';
import { ProfessionalInfoReducer } from './professionalInfoReducer';
import { SkillInfoReducer } from './skillInfoReducer';
import { profileInfoReducer } from './profileInfoReducer';
import { appLanguageReducer } from "./appLanguage";


const rootReducer = combineReducers({
  user: userLoginReducer,
  academicinfo: academicInfoReducer,
  languageinfo: LanguageInfoReducer,
  professionalinfo: ProfessionalInfoReducer,
  skillinfo: SkillInfoReducer,
  profileinfo: profileInfoReducer,
  appLanguage: appLanguageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
