import { Axios_API } from '../Api';

export const newPassWithToken = async (resetToken:string, newPassword:string): Promise<{ status: number; data: any; }>  => {
  
  try {
    const { status, data } = await Axios_API.post('/newpass', {
      resetToken,
      newPassword 
    });
    console.log("Reset password with token", data, status)
    if (status == 200) {
      return { status, data };
    }
  } catch (error) {
    const {data, status} = error.response;
    return { status, data };
  }
};