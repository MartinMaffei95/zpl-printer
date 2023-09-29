import * as jszpl from "jszpl";
export const createText = (t: string) => {
  const text = new jszpl.Text();
  const label = new jszpl.Label();
  label.content.push(text);
  text.text = t;
  text.fontFamily = new jszpl.FontFamily(jszpl.FontFamilyName.D);
  text.verticalAlignment = new jszpl.Alignment(jszpl.AlignmentValue.Center);
  text.horizontalAlignment = new jszpl.Alignment(jszpl.AlignmentValue.Center);

  const zpl = label.generateZPL();
  return zpl;
};
export const createGrid = (barcodeData: string) => {
  /* Crete the label */
  const label = new jszpl.Label();
  /* Label config */
  const labelWidth = new jszpl.Size(396);
  const labelHeight = new jszpl.Size(480);

  /* Adding the config to the label */
  label.height = labelHeight;
  label.widht = labelWidth;
  label.padding = new jszpl.Spacing(10, 20);
  label.printDensity = new jszpl.PrintDensity(jszpl.PrintDensityName["12dpmm"]);

  const text2 = new jszpl.Text();
  text2.text = `%%TEXT%%${dataToString(barcodeData)}%%END-TEXT%%`;
  text2.fontFamily = new jszpl.FontFamily(jszpl.FontFamilyName.A);
  text2.verticalAlignment = new jszpl.Alignment(jszpl.AlignmentValue.Center);
  text2.horizontalAlignment = new jszpl.Alignment(jszpl.AlignmentValue.Center);
  /* text2.fontFamily = new jszpl.PrintDensity(jszpl.PrintDensityName["24dpmm"]); */

  // making the grid container with the blocks
  const container = new jszpl.Grid();
  container.width = new jszpl.Size(labelWidth);
  container.height = new jszpl.Size(labelHeight);

  container.columns.push(new jszpl.Size(390, jszpl.SizeType.Absolute));
  container.rows.push(new jszpl.Size(1.15, jszpl.SizeType.Relative));
  container.rows.push(new jszpl.Size(1.15, jszpl.SizeType.Relative));
  container.rows.push(new jszpl.Size(1, jszpl.SizeType.Relative));

  /* Creating the content of blocks */

  /* BARCODE */
  const barcode = new jszpl.Barcode();
  barcode.type = new jszpl.BarcodeType(jszpl.BarcodeTypeName.Code128);
  barcode.data = barcodeData;
  barcode.interpretationLine = false;

  barcode.margin = new jszpl.Spacing(5, 10);

  /* QR- BARCODE */
  const qrCode = new jszpl.Barcode();
  qrCode.type = new jszpl.BarcodeType(jszpl.BarcodeTypeName.QRCode);
  qrCode.width = new jszpl.Size(150, jszpl.SizeType.Absolute);
  qrCode.height = new jszpl.Size(150, jszpl.SizeType.Absolute);
  qrCode.data = barcodeData;
  qrCode.left = 5;
  qrCode.top = 180;
  qrCode.fixed = true;

  container.content.push(barcode);

  barcode.grid.row = 0;
  container.content.push(text2);
  text2.grid.row = 1;
  container.content.push(qrCode);
  qrCode.grid.row = 2;

  /* container.border = 2; */
  container.columnSpacing = 2;
  container.rowSpacing = 2;

  label.content.push(container);

  const zpl = label.generateZPL();
  const forcedZpl = forceBarcodeWidth(zpl);

  const textFormated = addFormatToZPL(forcedZpl, dataToString(barcodeData));
  return textFormated;
};

const dataToString = (data: string): string => {
  const lineArray = data.split("\n");
  const filteredArray = lineArray.map((line) => line.trim());
  const formattedString = filteredArray.join(" - ");
  console.log(formattedString);
  return formattedString;
};

const forceBarcodeWidth = (zpl: string) => {
  // El valor que deseas insertar
  const valorAInsertar = "^BY1";

  // Encuentra la posición donde deseas insertar el valor (antes de ^BCN)
  const posicionInsercion = zpl.indexOf("^BCN,145");

  // Verifica si se encontró la posición de inserción
  if (posicionInsercion !== -1) {
    // Inserta el valor en la posición correcta
    zpl =
      zpl.slice(0, posicionInsercion) +
      valorAInsertar +
      zpl.slice(posicionInsercion);
  }

  // Ahora etiquetaZPL contiene el valor insertado
  return zpl;
};

function agregarRotacion90Grados(codigoOriginal) {
  // Agregar el comando ^FW90 para rotar 90 grados
  const codigoModificado = `^FWR\n${codigoOriginal}`;

  return codigoModificado;
}

const addFormatToZPL = (inputString, textToReplace) => {
  const formattedText = `^FWB\n^A0N,46,46\n^FD${textToReplace}^FS`;
  const regex = /%%TEXT%%([\s\S]*?)%%END-TEXT%%/g;

  const modifiedString = inputString.replace(regex, (match, capturedText) => {
    return formattedText;
  });

  return modifiedString;
};

export const createHorizontalGrid = (barcodeData: string) => {
  /* Crete the label */
  const label = new jszpl.Label();
  /* Label config */
  const labelWidth = new jszpl.Size(396);
  const labelHeight = new jszpl.Size(480);

  /* Adding the config to the label */
  label.height = labelHeight;
  label.widht = labelWidth;
  label.padding = new jszpl.Spacing(10, 20);
  label.printDensity = new jszpl.PrintDensity(jszpl.PrintDensityName["12dpmm"]);

  const text2 = new jszpl.Text();
  text2.text = `%%TEXT%%${dataToString(barcodeData)}%%END-TEXT%%`;
  text2.fontFamily = new jszpl.FontFamily(jszpl.FontFamilyName.A);
  text2.verticalAlignment = new jszpl.Alignment(jszpl.AlignmentValue.Center);
  text2.horizontalAlignment = new jszpl.Alignment(jszpl.AlignmentValue.Center);
  /* text2.fontFamily = new jszpl.PrintDensity(jszpl.PrintDensityName["24dpmm"]); */

  // making the grid container with the blocks
  const container = new jszpl.Grid();
  container.width = new jszpl.Size(labelWidth);
  container.height = new jszpl.Size(labelHeight);

  container.rows.push(new jszpl.Size(480, jszpl.SizeType.Absolute));
  container.columns.push(new jszpl.Size(1, jszpl.SizeType.Relative));
  container.columns.push(new jszpl.Size(0.3, jszpl.SizeType.Relative));
  container.columns.push(new jszpl.Size(0.7, jszpl.SizeType.Relative));

  /* Creating the content of blocks */

  /* BARCODE */
  const barcode = new jszpl.Barcode();
  barcode.type = new jszpl.BarcodeType(jszpl.BarcodeTypeName.Code128);
  barcode.data = barcodeData;
  barcode.interpretationLine = false;

  barcode.margin = new jszpl.Spacing(5, 10);

  /* QR- BARCODE */
  const qrCode = new jszpl.Barcode();
  qrCode.type = new jszpl.BarcodeType(jszpl.BarcodeTypeName.QRCode);
  qrCode.width = new jszpl.Size(150, jszpl.SizeType.Absolute);
  qrCode.height = new jszpl.Size(150, jszpl.SizeType.Absolute);
  qrCode.data = barcodeData;
  qrCode.left = 0;
  qrCode.top = 180;
  qrCode.fixed = true;

  container.content.push(barcode);

  barcode.grid.columns = 0;
  container.content.push(text2);
  text2.grid.columns = 1;
  container.content.push(qrCode);
  qrCode.grid.columns = 2;

  /* container.border = 2; */
  container.columnSpacing = 2;
  container.rowSpacing = 2;

  label.content.push(container);

  const zpl = label.generateZPL();
  const forcedZpl = forceBarcodeWidth(zpl);

  const textFormated = addFormatToZPL(forcedZpl, dataToString(barcodeData));
  return textFormated;
};
