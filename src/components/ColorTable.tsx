import React from "react";

type ColorTableProps = {
  colors: { id: number; name: string; hex: string }[];
  editColor: { id: number; name: string; hex: string } | null;
  setEditColor: React.Dispatch<
    React.SetStateAction<{ id: number; name: string; hex: string } | null>
  >;
  updateColor: () => void;
  deleteColor: (colorId: number) => void;
};

const ColorTable: React.FC<ColorTableProps> = ({
  colors,
  editColor,
  setEditColor,
  updateColor,
  deleteColor,
}) => {
  return (
    <div className="mt-6">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Hex</th>
            <th className="border p-2">Color</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => (
            <tr key={color.id} className="text-center">
              <td className="border p-2">{color.id}</td>
              <td className="border p-2">
                {editColor?.id === color.id ? (
                  <input
                    type="text"
                    value={editColor.name}
                    onChange={(e) =>
                      setEditColor({ ...editColor, name: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  color.name
                )}
              </td>
              <td className="border p-2">
                {editColor?.id === color.id ? (
                  <input
                    type="text"
                    value={editColor.hex}
                    onChange={(e) =>
                      setEditColor({ ...editColor, hex: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  color.hex
                )}
              </td>
              <td className="border p-2">
                <div
                  className="w-6 h-6 mx-auto rounded"
                  style={{ backgroundColor: color.hex }}
                ></div>
              </td>
              <td className="border p-2">
                {editColor?.id === color.id ? (
                  <button
                    onClick={updateColor}
                    className="bg-green-500 text-white px-2 py-1 mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditColor(color)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteColor(color.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColorTable;
