import { AxiosError } from 'axios';
import { Axios_API, setToken } from '../Api';

export const sendSignupRequest = async (email: String, password: String): Promise<{ status: number; data: any; }> => {
  const signupBody = {
    email: email,
    password: password
  };

  try {
    const { status, data } = await Axios_API.post('/signup', signupBody);
    if (status == 200) {
      // wich session should we pick here? 
      // if it`s a signup, should be zero?
      await setToken(data?.user?.sessions[0]?.token, data?.user?.sessions[0]?.refreshToken);
      return { status, data: data?.user };
    } else {
      return { status, data: { message: "Algo deu errado. Tente novamente mais tarde..." } }
    }
  } catch (error) {
    if ((error instanceof AxiosError) && (error?.response)) {
      const { status, data: responseData } = error?.response;
      var dataMessage = { message: "" };
      if ((responseData?.message == "") || (responseData?.message == undefined)) {
        dataMessage = { message: `${status} ${error?.code}` };
      } else {
        dataMessage = responseData;
      }
      console.log(`sendSignupRequest: Exception=${error} | status=${status} | code=${error?.code} `);
      return { status, data: dataMessage };
    }

    const status = 404;
    const data = { message: "Algo deu errado. Tente novamente mais tarde... (404)" };
    console.log(`sendSignupRequest: Exception=${error} | status=${status} | body=${JSON.stringify(data)} `);
    return { status, data };
  }
};