import { AxiosError } from 'axios';
import { Axios_API, loadToken } from '../Api';

export const sendLoginJWTRequest = async (): Promise<{ status: number }> => {
  const tokenLoaded = await loadToken();
  if (!tokenLoaded) {
    return { status: 404 }
  };

  try {
    const { status } = await Axios_API.get('/loginJWT');;
    return { status };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data: responseData } = error.response;
      let dataMessage = { message: "" };
      if ((responseData?.message == "") || (responseData?.message == undefined)) {
        dataMessage = { message: `${status} ${error?.code}` };
      } else {
        dataMessage = responseData;
      }
      console.log(`sendLoginJWTRequest: Exception=${error} | status=${status} | code=${error?.code} `);
      return { status };
    };

    const status = 404;
    const data = { message: "Exception trying to send login with token..." };
    console.log(`sendLoginJWTRequest: Exception=${error} | status=${status} | body=${data} `);
    return { status };
  };
};