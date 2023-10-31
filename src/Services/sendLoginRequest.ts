import { AxiosError } from 'axios';
import { Axios_API, setToken } from '../Api';

export const sendLoginRequest = async (email: String, password: String): Promise<{ status: number; data: any; }> => {
  const loginBody = {
    email: email,
    password: password,
    // pkce_hash: 'undefined_pkce_hash',
  };

  try {
    const { status, data } = await Axios_API.post('/login', loginBody);
    
    if (status == 200) {
      await setToken(data.token, data.refreshToken);
    }
    return { status, data };

  } catch (error) {
    if ((error instanceof AxiosError) && (error?.response)) {
      const { status, data: responseData } = error?.response;
      var dataMessage = { message: "" };
      if ((responseData?.message == "") || (responseData?.message == undefined)) {
        dataMessage = { message: `${status} ${error?.code}` };
      } else {
        dataMessage = responseData;
      }
      console.log(`sendLoginRequest: Exception=${error} | status=${status} | code=${error?.code} `);
      return { status, data: dataMessage };
    }

    const status = 404;
    const data = { message: "Algo deu errado. Tente novamente mais tarde... (404)" };
    console.log(`sendLoginRequest: Exception=${error} | status=${status} | body=${data} `);
    return { status, data };
  }
};