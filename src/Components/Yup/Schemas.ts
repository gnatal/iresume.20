import * as yup from "yup";

const yupInvalidMonthMsg = "Adicione um mês válido";
const yupInvalidYearMsg = "Adicione um ano válido";
const yupGraduationMsg = "Adicione uma graduação";
const yupInstitutionMsg = "Adicione uma Instituição de ensino";
const yupOcupationMsg = "Adicione um cargo";
const yupCompanyMsg = "Adicione uma empresa";
const yupDescriptionMsg = "Adicione uma descrição";
const yupLanguageMsg = "Adicione uma linguagem";
const yupProficiencyMsg = "Adicione uma prociciência";
const yupSkillMsg = "Adicione uma habilidade";
const yupSomethingWrongMsg = "Algo deu errado";
const yupOldPasswordRequiredMsg = "Informe sua senha antiga";
const yupNewPasswordRequiredMsg = "Informe sua nova senha";
const yupConfirmPasswordMsg = "As senhas não correspondem";

export const AcademicInfoSchema = yup.object().shape({
  graduation: yup.string().required(yupGraduationMsg),
  institution: yup.string().required(yupInstitutionMsg),
  description: yup.string().required(yupDescriptionMsg).max(250),
  stillWorkHere: yup.boolean(),
  startDateMonth: yup.number().typeError(yupInvalidMonthMsg)
    .required().min(1, yupInvalidMonthMsg).max(12, yupInvalidMonthMsg),
  startDateYear: yup.number().typeError(yupInvalidYearMsg)
    .required().min(1900, yupInvalidYearMsg).max(2100, yupInvalidYearMsg),
  endDateMonth: yup.string()
    .when("stillWorkHere", (values, schema) => {
      if (!values[0]) {
        return schema.required(yupInvalidMonthMsg).test("MonthValid", yupInvalidMonthMsg, function (value) {
          const month = parseInt(value);
          return (!isNaN(month) && ((month > 0) && (month < 13)));
        });
      };
      return schema;
    }),
  endDateYear: yup.string()
    .when("stillWorkHere", (values, schema) => {
      if (!values[0]) {
        return schema.required(yupInvalidYearMsg).test("YearValid", yupInvalidYearMsg, function (value) {
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

export const ProfessionalInfoSchema = yup.object().shape({
  ocupation: yup.string().required(yupOcupationMsg),
  company: yup.string().required(yupCompanyMsg),
  description: yup.string().required(yupDescriptionMsg).max(250),
  stillWorkHere: yup.boolean(),
  startDateMonth: yup.number().typeError(yupInvalidMonthMsg)
    .required().min(1, yupInvalidMonthMsg).max(12, yupInvalidMonthMsg),
  startDateYear: yup.number().typeError(yupInvalidYearMsg)
    .required().min(1900, yupInvalidYearMsg).max(2100, yupInvalidYearMsg),
  endDateMonth: yup.string()
    .when("stillWorkHere", (values, schema) => {
      if (!values[0]) {
        return schema.required(yupInvalidMonthMsg).test("MonthValid", yupInvalidMonthMsg, function (value) {
          const month = parseInt(value);
          return (!isNaN(month) && ((month > 0) && (month < 13)));
        });
      };
      return schema;
    }),
  endDateYear: yup.string()
    .when("stillWorkHere", (values, schema) => {
      if (!values[0]) {
        return schema.required(yupInvalidYearMsg).test("YearValid", yupInvalidYearMsg, function (value) {
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

export const LanguageInfoSchema = yup.object().shape({
  language: yup.string().typeError(yupSomethingWrongMsg).required(yupLanguageMsg),
  level: yup.number().typeError(yupSomethingWrongMsg).required(yupProficiencyMsg).min(0).max(100),
});

export const SkillInfoSchema = yup.object().shape({
  skill: yup.string().typeError(yupSomethingWrongMsg).required(yupSkillMsg),
  level: yup.number().typeError(yupSomethingWrongMsg).required(yupProficiencyMsg).min(0).max(100),
});

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(yupOldPasswordRequiredMsg).min(8),
  password: yup.string().required(yupNewPasswordRequiredMsg).min(8),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], yupConfirmPasswordMsg),
});