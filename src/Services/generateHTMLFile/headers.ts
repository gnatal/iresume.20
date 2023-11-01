import { template1Style } from "./template1Style";

export const generateStyle = (userName) => {
  return `
      <title>${userName}</title>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport" />  
      ${template1Style}
      `
;
};
