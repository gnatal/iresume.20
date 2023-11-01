import {
  IAcademicInfo,
  ILanguageInfo,
  IProfessionalInfo,
  IProfile,
  ISkillInfo,
} from "../../utils/DataTypes";


// <ul>
// <li class="profile-data"><span class="title">Name:</span> ${profile.name}</li>
// <li class="profile-data"><span class="title">Email:</span> ${profile.email}</li>
// <li class="profile-data"><span class="title">Phone:</span> ${profile.phone}</li>
// <li class="profile-data"><span class="title">Address:</span> 123 Main Street, City, State, ZIP</li>
// </ul>


export const generateHTMLProfile = (profile: IProfile) => {
  return `
    <div class="profile-section">
    <img src=${profile.image} alt="Profile Picture" class="profile-pic">
    <div>
      <h2>Personal Information</h2>

      <div>
        <p class="profile-data"><span class="title">Name:</span>${profile.name}</p>
        <p class="profile-data"><span class="title">Email:</span>${profile.email}</p>
        <p class="profile-data"><span class="title">Phone:</span> ${profile.phone}</p>
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
        <div class="education-course">${academicInfo.graduation}</div>
        <div class="education-course">${academicInfo.institution}</div>
        <div class="education-dates">${academicInfo.startDateMonth}/${academicInfo.startDateYear} - ${academicInfo.endDateMonth}/${academicInfo.endDateYear}</div>
        <div class="education-description">${academicInfo.description}</div>      
      </div>
    `;
  });

  return `
    <div id="education">
      <h2 class="section-header">Education</h2>
      <div class="education-section">
      ${educationList.join("\r\n")}
      </div>
    </div>
  `;
};


// <li>
// <span class="education-title">${professionInfo.ocupation}</span>
// <span class="subtitle">${professionInfo.company}</span>
// <span class="subtitle">${professionInfo.description}</span>
// <span class="date">From ${professionInfo.startDateMonth}/${professionInfo.startDateYear} to ${professionInfo.endDateMonth}/${professionInfo.endDateYear}</span>  
// </li>

export const generateProfessionalExperience = (
  professionalInfos: IProfessionalInfo[]
) => {
  if (professionalInfos.length === 0) return "";
  const professions = professionalInfos.map((professionInfo) => {
    return `
      <div class="education-container">
        <div class="education-course">${professionInfo.ocupation}</div>
        <div class="education-course">${professionInfo.company}</div>
        <div class="education-dates">${professionInfo.startDateMonth}/${professionInfo.startDateYear} - ${professionInfo.endDateMonth}/${professionInfo.endDateYear}</div>
        <div class="education-description">${professionInfo.description}</div>      
      </div>
    `;
  });

  return `
    <div id="experience">
      <h2 class="section-header">Experiences</h2>
      <div class="education-section">
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
    <div id="skills">
      <h2 class="section-header">Skills</h2>
      <div class="section-skills">
      ${skillInfo.join("\r\n")}
      </div>
    </div>
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
    <div id="languages">
      <h2 class="section-header">Languages</h2>
      <div class="section-skills">
      ${langInfo.join("\r\n")}
      </div>
    </div>
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
