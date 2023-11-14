import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { uploadHTMLToBucket } from "./uploadImageToBucket";

export const readHTMLTemplate = async () => {
  try {
    // the asset lib is stupid and throws a crazy error if you put wrong paths, be aware of that
    const [{ localUri }] = await Asset.loadAsync(
      require('../../assets/template.html')
    );
    console.log(localUri);

    const file = await FileSystem.readAsStringAsync(localUri)
    console.log("File", file)
  } catch (e) {
    console.log("readHTMLTemplate: ERROR AT READ FILE", e);
  }
};

export const writeHTMLFile = async (fileName: string, fileContent: string) => {
  try {
    const fileUri = `${FileSystem.cacheDirectory}${fileName}`
    await FileSystem.writeAsStringAsync(fileUri, fileContent, {
      encoding: FileSystem.EncodingType.UTF8
    });
    let location = await uploadHTMLToBucket(fileUri);
    if (location) {
      location = location + `?date=${Date.now()}`;
    };
    return location;
  } catch (e) {
    console.log("writeHTMLFile: ERROR WRITTING FILE", e)
  }
  return "";
}