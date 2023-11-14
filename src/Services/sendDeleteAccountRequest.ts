import { AxiosError } from 'axios';
import { Axios_API, setToken } from '../Api';

export const sendDeleteAccountRequest = async (): Promise<{ status: number }> => {
  try {
    const { status } = await Axios_API.post('/deleteaccount');
    if (status == 200) {
      await setToken("", "");
    }
    return { status };

  } catch (error) {
    if ((error instanceof AxiosError) && (error?.response)) {
      const { status, data: responseData } = error?.response;
      var dataMessage = { message: "" };
      if ((responseData?.message == "") || (responseData?.message == undefined)) {
        dataMessage = { message: `${status} ${error?.code}` };
      } else {
        dataMessage = responseData;
      }
      console.log(`sendDeleteAccountRequest: Exception=${error} | status=${status} | code=${error?.code} `);
      return { status };
    }

    const status = 404;
    const data = { message: "Exception trying to send delete account..." };
    console.log(`sendDeleteAccountRequest: Exception=${error} | status=${status} | body=${data} `);
    return { status };
  }
};