////////////////////////////////////////////////////////////////////////////////
// User and Auth Types
export type User = {
    ID: Number;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
  
  export type AuthSPA = {
    pkce: String;
    pkceHash: String;
    authCode: String;
    authCodeUsed: Boolean;
  };
  
  export type Session = {
    clientID: Number;
    sessionID: Number;
    token: String;
    refreshToken: String;
  };
  
  export type UserLoginState = {
    user: User;
    spa: AuthSPA;
    session: Session;
    logged: Boolean;
    errorID: Number;
    errorMsg: String;
  };
  
  export const initialUserLoginState: UserLoginState = {
    user: { ID: 0, email: '', password: '', passwordConfirmation: '' },
    spa: { pkce: '', pkceHash: '', authCode: '', authCodeUsed: false },
    session: { sessionID: 0, clientID: 0, token: '', refreshToken: '' },
    logged: false,
    errorID: 0,
    errorMsg: '',
  };
  
  ////////////////////////////////////////////////////////////////////////////////
  // Types used to hold/move Information about the user Resume
  export interface IProfileInfo {
    name: string;
    email: string;
    phone: string;
    photo?: any;
    pdfLink?: string;
    description?: string;
    address?: string;
  };
  export interface IProfileInfoProps {
    ProfileInfo?: IProfileInfo;
    Edit?: Boolean;
    navigation?: any;
  }
  
  export interface IAcademicInfo {
    id: number;
    graduation: string;
    institution: string;
    startDateMonth: number;
    startDateYear: number;
    endDateMonth: number;
    endDateYear: number;
    description: string;
  }
  export interface IAcademicProps {
    AcademicInfoArray: IAcademicInfo[];
    Edit?: Boolean;
    navigation?: any;
  }
  
  export interface IProfessionalInfo {
    id: number;
    ocupation: string;
    company: string;
    startDateMonth: number;
    startDateYear: number;
    endDateMonth: number;
    endDateYear: number;
    description: string;
  }
  export interface IProfessionalProps {
    ProfessionalInfoArray: IProfessionalInfo[];
    Edit?: Boolean;
    navigation?: any;
  };
  
  // Languages and skills
  
  export interface ILanguageInfo {
    id: number;
    language: string;
    level: number;
  };
  export interface ILanguageProps {
    LanguageInfoArray: ILanguageInfo[];
    Edit?: Boolean;
    navigation?: any;
  };
  export interface ISkillInfo {
    id: number;
    skill: string;
    level: number;
  };
  export interface ISkillProps {
    SkillInfoArray: ISkillInfo[];
    Edit?: Boolean;
    navigation?: any;
  };
  
  export interface IProfile {
    email: string;
    phone: string;
    image: string;
    name: string;
  }