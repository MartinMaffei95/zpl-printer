"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var print_controller_1 = require("./controllers/print.controller");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var PORT = 1567;
// Ruta para recibir datos desde la web
app.post("/print", print_controller_1.printZPLData);
// Iniciar el servidor en el puerto 3000
app.listen(PORT, function () {
    console.log("Servidor en ejecución en el puerto " + PORT);
});
