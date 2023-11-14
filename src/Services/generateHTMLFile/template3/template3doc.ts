import {
    IAcademicInfo,
    ILanguageInfo,
    IProfessionalInfo,
    IProfile,
    ISkillInfo,
  } from "../../../utils/DataTypes";
  import {
    geenrateLanguage,
    generateAcademicInfo,
    generateHTMLProfile,
    generateProfessionalExperience,
    generateSkills,
  } from "./template3body";
  import { generateStyle } from "./template3header";
  
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
                <div class="layout">
                    <div id="profile" class="profile-section">
                    ${generateHTMLProfile({
                        ...profile,
                      })}
                      <div id="skills">
                      <h2 class="section-header" style="margin-left: 10px;">Skills</h2>
                       <div class="section-skills">  
                         ${generateSkills([...skillInfo])}
                         ${geenrateLanguage([...languages])}
                       </div>
                       </div>
         
                    </div>
                    <div id="education" class="data-section">
                    <h2 class="section-header">Education</h2>
                    <div class="education-grid">
        
                    ${generateAcademicInfo([...academicInfo])}
                    </div>
                    <div id="education" class="data-section">
                    <h2 class="section-header">Experience</h2>
                    <div class="education-grid">
        
                    ${generateProfessionalExperience([...professionalExperience])}
                    </div>
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
  