import { Axios_API } from '../Api';

export const sendSignedUrlRequest = async (type: string): Promise<string> => {
  try {
    const { data } = await Axios_API.post(`/presigned/${type}`);
    return data.presignedUrl;
  } catch (error) {
    console.error(`sendSignedUrlRequest: Exception=${error}`);
    throw new Error("Não foi possível obter o link para upload do arquivo");
  }
};