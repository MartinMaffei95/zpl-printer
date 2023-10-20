import express from "express";
import { printZPLData } from "./controllers/print.controller";

const app = express();

app.use(express.json());

const PORT = 1567;

// Ruta para recibir datos desde la web
app.post("/print", printZPLData);

// Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log("Servidor en ejecución en el puerto " + PORT);
});
