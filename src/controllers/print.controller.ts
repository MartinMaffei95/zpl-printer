import { printNewZplLabel } from "../services/Zpl.service";

export const printZPLData = async (req, res) => {
  try {
    const { printData } = req.body;
    if (!printData) throw new Error("printData No existe");

    const response = await printNewZplLabel(printData);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};
