import { NextApiRequest, NextApiResponse } from "next";
import { colors, setColors } from "../../../data/colors";

const handlePutRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, hex } = req.body;

  const colorId = parseInt(id as string, 10);

  if (!name || !hex) {
    return res.status(400).json({ error: "Name and hex are required" });
  }

  if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
    return res.status(400).json({ error: "Invalid hex color format" });
  }

  const colorIndex = colors.findIndex((color) => color.id === colorId);
  if (colorIndex === -1) {
    return res.status(404).json({ error: "Color not found" });
  }

  const updatedColors = [...colors];
  updatedColors[colorIndex] = { ...updatedColors[colorIndex], name, hex };

  setColors(updatedColors);

  return res.status(200).json(updatedColors[colorIndex]);
};

const handleDeleteRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const colorId = parseInt(id as string, 10);

  const index = colors.findIndex((color) => color.id === colorId);
  if (index === -1) {
    return res.status(404).json({ error: "Color not found" });
  }

  const updatedColors = colors.filter((color) => color.id !== colorId);
  setColors(updatedColors);

  return res.status(200).json({ message: "Color deleted successfully" });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return handlePutRequest(req, res);
    case "DELETE":
      return handleDeleteRequest(req, res);
    default:
      return res.status(405).json({ error: "Method Not Allowed" });
  }
}
