import fs from "fs/promises";

export const writeFileAsync = async (zpl: string) => {
  try {
    console.log("File is created successfully.");
    return await fs.writeFile("file.zpl", zpl);
  } catch (err) {
    console.error("Error writing file:", err);
  }
};
