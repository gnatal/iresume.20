import { Axios_API } from '../Api';

export const resetPasswordRequest = async (email:string): Promise<{ status: number; data: any; }>  => {

  try {
    const { status, data } = await Axios_API.post('/reset', {
        email
    });
    console.log("Reset password", data, status)
    if (status == 200) {
      return { status, data };
    }
  } catch (error) {
    const {data, status} = error.response;
    return { status, data };
  }
};