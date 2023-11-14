import {
    IAcademicInfo,
    ILanguageInfo,
    IProfessionalInfo,
    IProfile,
    ISkillInfo,
  } from "../../../utils/DataTypes";
    
  export const generateHTMLProfile = (profile: IProfile) => {
    return `
        <div class="profile-image-box">
            <img class="profile-image" src="${profile.image}" alt="Profile Picture" class="profile-image">
        </div>
        <div class="profile-data">  
            <p class="profile-text">${profile.name}</p>
            <p class="profile-text">${profile.email}</p>
            <p class="profile-text">${profile.phone}</p>
        </div>
      `;
  };
  
  export const generateAcademicInfo = (academicInfos: IAcademicInfo[]) => {
    if (academicInfos.length === 0) return "";
    const educationList = academicInfos.map((academicInfo) => {
      return `
          <div class="education-container">
            <div class="education-title">${academicInfo.graduation}</div>
            <div class="education-title">${academicInfo.institution}
              <div class="education-dates">${academicInfo.startDateMonth}/${academicInfo.startDateYear} - ${academicInfo.endDateMonth}/${academicInfo.endDateYear}</div>
            </div>
            <div class="education-description">${academicInfo.description}</div>      
          </div>
        `;
    });
  
    return `
          ${educationList.join("\r\n")}
          `;
  };
    
  export const generateProfessionalExperience = (
    professionalInfos: IProfessionalInfo[]
  ) => {
    if (professionalInfos.length === 0) return "";
    const professions = professionalInfos.map((professionInfo) => {
      return `
          <div class="education-container">
            <div class="education-title">${professionInfo.ocupation}</div>
            <div class="education-title">${professionInfo.company}
              <div class="education-dates">${professionInfo.startDateMonth}/${professionInfo.startDateYear} - ${professionInfo.endDateMonth}/${professionInfo.endDateYear}</div>
            </div>
            <div class="education-description">${professionInfo.description}</div>      
          </div>
        `;
    });
  
    return `
          ${professions.join("\r\n")}
      `;
  };
  
  export const generateSkills = (skills: ISkillInfo[]) => {
    if (skills.length === 0) return "";
    const skillInfo = skills.map((skill) => {
      return `
          <div class="skill">
            <span class="skill-label">${skill.skill}</span>
            <div class="skill-bar">
              <div class="skill-level" style="width: ${skill.level}%;"></div>
            </div>
          </div>
      `;
    });
  
    return `
          ${skillInfo.join("\r\n")}
      `;
  };
  
  export const geenrateLanguage = (languages: ILanguageInfo[]) => {
    if (languages.length === 0) return "";
    const langInfo = languages.map((languages) => {
      return `
          <div class="skill">
            <span class="skill-label">${languages.language}</span>
            <div class="skill-bar">
              <div class="skill-level" style="width: ${languages.level}%;"></div>
            </div>
          </div>
      `;
    });
  
    return `
          ${langInfo.join("\r\n")}
      `;
  };
  