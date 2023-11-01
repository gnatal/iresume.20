import { sendSignedUrlRequest } from "./sendSignedUrlRequest";

export const uploadImageToBucket = async (photoUri: string) => {
  const type = photoUri.split(".").reverse()[0];
  const url = await sendSignedUrlRequest(type);
  const result = await uploadFile(url, photoUri);
  if (result.status == 200) {
    console.log(url.split("?")[0]);
    return url.split("?")[0];
  }
  return "";
}

export const uploadHTMLToBucket = async (fileUri: string) => {
  const type = "html";
  const url = await sendSignedUrlRequest(type);
  const result = await uploadFile(url, fileUri);
  if (result.status == 200) {
    console.log(url.split("?")[0]);
    return url.split("?")[0];
  }
  return "";
}

export const uploadFile = async (uploadUrl: string, fileUri: string) => {
  const fileBlob = await getBlob(fileUri);
  return fetch(uploadUrl, {
    method: "PUT",
    body: fileBlob,
  });
};

export const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  const fileBlob = await resp.blob();
  return fileBlob;
};
