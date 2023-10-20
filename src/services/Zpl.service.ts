import { createZpl } from "../utils/createZpl";
import { writeFileAsync } from "../utils/writeFile";
import { exec } from "child_process";

export const printNewZplLabel = async (data: string) => {
  const zpl = createZpl(data);

  await writeFileAsync(zpl);

  let executesPrint = true;

  if (executesPrint) {
    exec("lp ./file.zpl", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        throw new Error(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        throw new Error(`STD error: ${stderr}`);
      }
      console.log(`stdout: ${zpl}`);
    });
  }
  return "Impresion completada";
};
