import { AxiosError } from 'axios';
import { Axios_API, setToken } from '../Api';

export const sendChangePasswordRequest = async (oldPassword: String, newPassword: String): Promise<{ status: number }> => {
  const changePasswordBody = { oldPassword, newPassword };
  try {
    const { status } = await Axios_API.post('/change', changePasswordBody);
    return { status };
  } catch (error) {
    if ((error instanceof AxiosError) && (error?.response)) {
      const { status, data: responseData } = error?.response;
      let dataMessage = { message: "" };
      if ((responseData?.message == "") || (responseData?.message == undefined)) {
        dataMessage = { message: `${status} ${error?.code}` };
      } else {
        dataMessage = responseData;
      }
      console.log(`sendChangePasswordRequest: Exception=${error} | status=${status} | code=${error?.code} `);
      return { status };
    }

    const status = 404;
    const data = { message: "Exception trying to send change password..." };
    console.log(`sendChangePasswordRequest: Exception=${error} | status=${status} | body=${data} `);
    return { status };
  }
};