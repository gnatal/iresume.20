import {
  IAcademicInfo,
  ILanguageInfo,
  IProfessionalInfo,
  IProfile,
  ISkillInfo,
  Languages,
} from "../../../utils/DataTypes";
import {
  geenrateLanguage,
  generateAcademicInfo,
  generateHTMLProfile,
  generateProfessionalExperience,
  generateSkills,
} from "./template2body";
import { generateStyle } from "./template2header";

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
              <div id="skills">
                 <h2 class="section-header">Skills</h2>
                  <div class="section-skills">  
                    ${generateSkills([...skillInfo])}
                    ${geenrateLanguage([...languages])}
                    </div>
              </div>
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
          ${generateHeader({ name: profile.name })}
          ${generateBody({
            profile,
            academicInfo,
            professionalExperience,
            skillInfo,
            languages,
          })}
      </html>
      
      `;
};

// <!DOCTYPE html>
// <html>
// <head>
