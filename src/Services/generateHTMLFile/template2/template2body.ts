import {
  IAcademicInfo,
  ILanguageInfo,
  IProfessionalInfo,
  IProfile,
  ISkillInfo,
} from "../../../utils/DataTypes";

export const generateHTMLProfile = (profile: IProfile) => {
  return `
      <div id="profile" class="profile-section">
      <img src="${profile.image}" alt="Profile Picture" class="profile-image">
      <div class="profile-data">  
        <div>
          <p class="profile-text">${profile.name}</p>
          <p class="profile-text">${profile.email}</p>
          <p class="profile-text">${profile.phone}</p>
        </div>
      </div>
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
      <div id="education" class="education">
        <h2 class="section-header">Education</h2>
        <div class="education-grid">
        ${educationList.join("\r\n")}
        </div>
      </div>
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
      <div id="experience" class="education">
        <h2 class="section-header">Experience</h2>
        <div class="education-grid">
        ${professions.join("\r\n")}
        </div>
      </div>
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

// <div class="section">
// <h2>Education</h2>
// <ul>
//   <li>
// <span class="title">Bachelor of Science, Computer Science</span>
// <span class="subtitle">University of XYZ</span>
// <span class="date">Graduated May 20XX</span>
//   </li>
// </ul>
// </div>
