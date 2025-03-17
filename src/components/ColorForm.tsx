// ColorForm.tsx
import React from "react";

type ColorFormProps = {
  newColor: { name: string; hex: string };
  setNewColor: React.Dispatch<
    React.SetStateAction<{ name: string; hex: string }>
  >;
  addColor: () => void;
  errorMessage: string;
};

const ColorForm: React.FC<ColorFormProps> = ({
  newColor,
  setNewColor,
  addColor,
  errorMessage,
}) => {
  return (
    <div className="mt-4 flex">
      <input
        type="text"
        placeholder="Color Name"
        value={newColor.name}
        onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Hex Code"
        value={newColor.hex}
        onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
        className="border p-2 mr-2"
      />
      <button onClick={addColor} className="bg-blue-500 text-white p-2">
        Add Color
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </div>
  );
};

export default ColorForm;
