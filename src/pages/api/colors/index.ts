import { NextApiRequest, NextApiResponse } from "next";
import { colors, setColors, Color } from "../../../data/colors";

const generateId = (): number => {
  return colors.length
    ? Math.max(...colors.map((color: Color) => color.id)) + 1
    : 1;
};

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const { name, hex } = req.query;

  const filteredColors = colors.filter((color: Color) => {
    const matchesName =
      name && color.name.toLowerCase().includes((name as string).toLowerCase());
    const matchesHex =
      hex &&
      color.hex.toLowerCase().includes((hex as string).trim().toLowerCase());

    return (name ? matchesName : true) && (hex ? matchesHex : true);
  });

  return res.status(200).json(filteredColors);
};

const handlePostRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const { name, hex } = req.body;

  if (!name || !hex) {
    return res.status(400).json({ error: "Name and hex are required" });
  }

  if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
    return res.status(400).json({ error: "Invalid hex color format" });
  }

  const newColor: Color = { id: generateId(), name, hex };
  const updatedColors: Color[] = [...colors, newColor];

  setColors(updatedColors);

  return res.status(201).json(newColor);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return handleGetRequest(req, res);
    case "POST":
      return handlePostRequest(req, res);
    default:
      return res.status(405).json({ error: "Method Not Allowed" });
  }
}
