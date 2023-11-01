import {
  IAcademicInfo,
  ILanguageInfo,
  IProfessionalInfo,
  IProfile,
  ISkillInfo,
  Languages,
} from "../../utils/DataTypes";
import { aInfo1, pInfo1, pInfo2 } from "../../utils/infoExamples";
import {
  geenrateLanguage,
  generateAcademicInfo,
  generateHTMLProfile,
  generateProfessionalExperience,
  generateSkills,
} from "./body";
import { generateStyle } from "./headers";

export const generateHeader = ({ name }: { name: string }) => {
  return `
        <head>
            ${generateStyle(name)}
        </head>
    `;
};

interface IGenerateBody {
  profile: IProfile;
  academicInfo: IAcademicInfo[];
  professionalExperience: IProfessionalInfo[];
  skillInfo: ISkillInfo[];
  languages: ILanguageInfo[];
}

export const generateBody = ({
  profile,
  academicInfo,
  professionalExperience,
  skillInfo,
  languages,
}: IGenerateBody) => {
  return `
        <body>
            ${generateHTMLProfile({
              ...profile,
            })}
            <br />
            ${generateAcademicInfo([...academicInfo])}
            <br />
            ${generateProfessionalExperience([...professionalExperience])}
            <br />
            ${generateSkills([...skillInfo])}
            <br />
            ${geenrateLanguage([...languages])}
        </body>
    `;
};

export const generateDoc = ({
  profile,
  academicInfo,
  professionalExperience,
  skillInfo,
  languages,
}: IGenerateBody) => {
  return `
    <!DOCTYPE html>
    <html>
        ${generateHeader({ name: profile.name})}
        ${generateBody({
          profile,
          academicInfo,
          professionalExperience,
          skillInfo,
          languages
        })}
    </html>
    
    `;
};

// <!DOCTYPE html>
// <html>
// <head>
