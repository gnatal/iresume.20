import * as yup from "yup";

export const AcademicInfoSchema = (t) => {
  return yup.object().shape({
    graduation: yup.string().required(t("yupGraduationMsg")),
    institution: yup.string().required(t("yupInstitutionMsg")),
    description: yup.string().required(t("yupDescriptionMsg")).max(250),
    stillWorkHere: yup.boolean(),
    startDateMonth: yup.number().typeError(t("yupInvalidMonthMsg"))
      .required().min(1, t("yupInvalidMonthMsg")).max(12, t("yupInvalidMonthMsg")),
    startDateYear: yup.number().typeError(t("yupInvalidYearMsg"))
      .required().min(1900, t("yupInvalidYearMsg")).max(2100, t("yupInvalidYearMsg")),
    endDateMonth: yup.string()
      .when("stillWorkHere", (values, schema) => {
        if (!values[0]) {
          return schema.required(t("yupInvalidMonthMsg")).test("MonthValid", t("yupInvalidMonthMsg"), function (value) {
            const month = parseInt(value);
            return (!isNaN(month) && ((month > 0) && (month < 13)));
          });
        };
        return schema;
      }),
    endDateYear: yup.string()
      .when("stillWorkHere", (values, schema) => {
        if (!values[0]) {
          return schema.required(t("yupInvalidYearMsg")).test("YearValid", t("yupInvalidYearMsg"), function (value) {
            const year = parseInt(value);
            if (!isNaN(year) && ((year > 1900) && (year < 2100))) {
              const { startDateMonth, startDateYear, endDateMonth } = this.parent;
              const month = parseInt(endDateMonth);
              return (startDateYear < year) || ((startDateYear == year) && (month >= startDateMonth));
            }
            return false;
          });
        };
        return schema;
      }),
  })
}



export const ProfessionalInfoSchema = (t) => {
  return yup.object().shape({
    ocupation: yup.string().required(t("yupOcupationMsg")),
    company: yup.string().required(t("yupCompanyMsg")),
    description: yup.string().required(t("yupDescriptionMsg")).max(250),
    stillWorkHere: yup.boolean(),
    startDateMonth: yup.number().typeError(t("yupInvalidMonthMsg"))
      .required().min(1, t("yupInvalidMonthMsg")).max(12, t("yupInvalidMonthMsg")),
    startDateYear: yup.number().typeError(t("yupInvalidYearMsg"))
      .required().min(1900, t("yupInvalidYearMsg")).max(2100, t("yupInvalidYearMsg")),
    endDateMonth: yup.string()
      .when("stillWorkHere", (values, schema) => {
        if (!values[0]) {
          return schema.required(t("yupInvalidMonthMsg")).test("MonthValid", t("yupInvalidMonthMsg"), function (value) {
            const month = parseInt(value);
            return (!isNaN(month) && ((month > 0) && (month < 13)));
          });
        };
        return schema;
      }),
    endDateYear: yup.string()
      .when("stillWorkHere", (values, schema) => {
        if (!values[0]) {
          return schema.required(t("yupInvalidYearMsg")).test("YearValid", t("yupInvalidYearMsg"), function (value) {
            const year = parseInt(value);
            if (!isNaN(year) && ((year > 1900) && (year < 2100))) {
              const { startDateMonth, startDateYear, endDateMonth } = this.parent;
              const month = parseInt(endDateMonth);
              return (startDateYear < year) || ((startDateYear == year) && (month >= startDateMonth));
            }
            return false;
          });
        };
        return schema;
      }),
  });
}

export const LanguageInfoSchema = (t) => {
  return yup.object().shape({
    language: yup.string().typeError(t("yupSomethingWrongMsg")).required(t("yupLanguageMsg")),
    level: yup.number().typeError(t("yupSomethingWrongMsg")).required(t("yupProficiencyMsg")).min(0).max(100),
  });
}

export const SkillInfoSchema = (t) => {
  return yup.object().shape({
    skill: yup.string().typeError(t("yupSomethingWrongMsg")).required(t("yupSkillMsg")),
    level: yup.number().typeError(t("yupSomethingWrongMsg")).required(t("yupProficiencyMsg")).min(0).max(100),
  });
}

export const LinkInfoSchema = (t) => {
  return yup.object().shape({
    label: yup.string().typeError(t("yupSomethingWrongMsg")).required(t("yupLinkLabelMsg")).max(30, t("yupSomethingWrongMsg")),
    url: yup.string().typeError(t("yupSomethingWrongMsg")).required(t("yupLinkUrlMsg")).max(200, t("yupSomethingWrongMsg")),
    icon: yup.number().typeError(t("yupSomethingWrongMsg")).min(0).max(200).default(0),
    enable: yup.boolean().typeError(t("yupSomethingWrongMsg")).default(true),
  });
}


export const ChangePasswordSchema = (t) => {
  return yup.object().shape({
    oldPassword: yup.string().required(t("yupOldPasswordRequiredMsg")).min(8),
    password: yup.string().required(t("yupNewPasswordRequiredMsg")).min(8),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], t("yupConfirmPasswordMsg")),
  });
}

export const profileSchema = (t) => {
  return yup.object().shape({
    name: yup.string().required(t("yupNameRequiredMsg")),
    email: yup.string().email().required(t("yupEmailRequiredMsg")),
    phone: yup.string().required(t("yupPhoneRequiredMsg")).min(8),
    address: yup.string(),
    description: yup.string(),
  });
}
export const loginSchema = (t) => {
  return yup.object().shape({
    email: yup.string().email().required(t("yupEmailRequiredMsg")),
    password: yup.string().required(t("yupPasswordRequiredMsg")).min(8),
  });
}