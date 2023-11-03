import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../store/profileInfoReducer";
import { getProfessional } from "../store/professionalInfoReducer";
import { getAcademic } from "../store/academicInfoReducer";
import { getLanguage } from "../store/languageInfoReducer";
import { getSkill } from "../store/skillInfoReducer";

export default function useLoadUserData() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    try {
      dispatch(getProfile());
      dispatch(getProfessional());
      dispatch(getAcademic());
      dispatch(getLanguage());
      dispatch(getSkill());
    } catch (error) {
      console.log("handleRequestInfo error", error);
    }
  }, []);

  return [dispatch];
}
