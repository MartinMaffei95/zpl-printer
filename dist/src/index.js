"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var child_process_1 = require("child_process");
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Ruta para recibir datos desde la web
app.post("/imprimir", function (req, res) {
    var datos = req.body; // Los datos que recibes desde la web
    // Imprimir en la impresora Zebra
});
app.get("/", function (req, res) {
    console.log("me executo");
    (0, child_process_1.exec)("lp ./assets/printer-files/test.zpl", function (error, stdout, stderr) {
        if (error) {
            console.log("error: ".concat(error.message));
            return;
        }
        if (stderr) {
            console.log("stderr: ".concat(stderr));
            return;
        }
        console.log("stdout: ".concat(stdout));
    });
    res.json("holi");
});
// Iniciar el servidor en el puerto 3000
app.listen(4545, function () {
    console.log("Servidor en ejecución en el puerto 3000");
});
