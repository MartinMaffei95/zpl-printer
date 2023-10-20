// NO TOCAR ESPACIOS NI NADA DEL STRING. EL MAS MINIMO MOVIMIENTO DESTRUIRIA HORAS Y HORAS DE TABAJO Y LAGRIMAS.
//Si se modifica algo el QR no entra en la etioquet
export const createZpl = (data: string) => {
  return `
    ^XA   
      ^FO450,40,2,10^BCR,155,N,N,N,A^BY2^FH^FD${convertDataToZplCodeData(
        data
      )}^FS
      ^BQN,2,6,H,1^FO375,25,1^FH^FD,B0${convertDataToZplCodeData(data)}^FS      
      ^TBR,40,50^ABR,40,18^FO275,200,2^FD${dataToString(data)}^FS   
    ^XZ`;
};

const dataToString = (data: string): string => {
  const lineArray = data.split("\n");
  const filteredArray = lineArray.map((line) => line.trim());
  const formattedString = filteredArray.join("-");
  return formattedString;
};

const convertDataToZplCodeData = (data: string): string => {
  if (!data) return "";
  const lineas = data.split("\n");
  const formattedString = lineas.join("_0D_0A");

  return formattedString;
};
