import express from "express";
import { exec } from "child_process";
import {
  createGrid,
  createHorizontalGrid,
  createText,
} from "./services/Zpl.service";

import fs from "fs/promises";

const app = express();

app.use(express.json());

// Ruta para recibir datos desde la web
app.post("/imprimir", (req, res) => {
  const datos = req.body; // Los datos que recibes desde la web
  // Imprimir en la impresora Zebra
});

app.get("/", async (req, res) => {
  const data = `F
  037
  01
  01`;
  const zpl = createHorizontalGrid(data);

  async function writeFileAsync() {
    try {
      console.log("File is created successfully.");
      return await fs.writeFile("file.zpl", zpl);
    } catch (err) {
      console.error("Error writing file:", err);
    }
  }

  await writeFileAsync();
  //./src/assets/printer-files/test.zpl
  //./file.zpl

  let executesPrint = true;

  if (executesPrint) {
    exec("lp ./file.zpl", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${zpl}`);
    });
  }

  res.json(zpl);
});

// Iniciar el servidor en el puerto 3000
app.listen(4545, () => {
  console.log("Servidor en ejecución en el puerto 3000");
});
