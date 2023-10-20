"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZpl = void 0;
// NO TOCAR ESPACIOS NI NADA DEL STRING. EL MAS MINIMO MOVIMIENTO DESTRUIRIA HORAS Y HORAS DE TABAJO Y LAGRIMAS.
//Si se modifica algo el QR no entra en la etioquet
var createZpl = function (data) {
    return "\n    ^XA   \n      ^FO450,40,2,10^BCR,155,N,N,N,A^BY2^FH^FD".concat(convertDataToZplCodeData(data), "^FS\n      ^BQN,2,6,H,1^FO375,25,1^FH^FD,B0").concat(convertDataToZplCodeData(data), "^FS      \n      ^TBR,40,50^ABR,40,18^FO275,200,2^FD").concat(dataToString(data), "^FS   \n    ^XZ");
};
exports.createZpl = createZpl;
var dataToString = function (data) {
    var lineArray = data.split("\n");
    var filteredArray = lineArray.map(function (line) { return line.trim(); });
    var formattedString = filteredArray.join("-");
    return formattedString;
};
var convertDataToZplCodeData = function (data) {
    if (!data)
        return "";
    var lineas = data.split("\n");
    var formattedString = lineas.join("_0D_0A");
    return formattedString;
};
