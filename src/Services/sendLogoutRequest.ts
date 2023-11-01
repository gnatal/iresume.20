import { AxiosError } from 'axios';
import { Axios_API, setToken } from '../Api';

export const sendLogoutRequest = async (): Promise<{ status: number; data: any; }> => {
  try {
    const { status, data } = await Axios_API.post('/logout');
    if (status == 200) {
      await setToken("", "");
    } else {
      console.log(`sendLogoutRequest status=${status} | body=${JSON.stringify(data)}`);
    }
    return { status, data }
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const { status, data: responseData } = error.response;
      var dataMessage = { message: "" };
      if ((responseData?.message == "") || (responseData?.message == undefined)) {
        dataMessage = { message: `${status} ${error?.code}` };
      } else {
        dataMessage = responseData;
      }
      console.log(`sendLogoutRequest: Exception=${error} | status=${status} | code=${error?.code} `);
      return { status, data: dataMessage };
    }

    const status = 404;
    const data = { message: "Exception trying to send logout..." };
    console.log(`sendLogoutRequest: Exception=${error} | status=${status} | body=${data} `);
    return { status, data };
  }
};