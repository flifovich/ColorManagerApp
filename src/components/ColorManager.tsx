import { useState, useEffect } from "react";
import { request } from "../utils/request";
import Search from "./Search";
import ColorForm from "./ColorForm";
import ColorTable from "./ColorTable";

type Color = {
  id: number;
  name: string;
  hex: string;
};

export default function ColorManager() {
  const [colors, setColors] = useState<Color[]>([]);
  const [newColor, setNewColor] = useState({ name: "", hex: "" });
  const [editColor, setEditColor] = useState<Color | null>(null);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchType, setSearchType] = useState<"name" | "hex">("name");

  const fetchColors = (query = "", searchType = "name") => {
    let queryString = "";

    if (query) {
      query = query.trim().toLowerCase();

      if (searchType === "hex") {
        if (!query.startsWith("#")) {
          query = `#${query}`;
        }
        queryString = `?hex=${encodeURIComponent(query)}`;
      } else {
        queryString = `?name=${encodeURIComponent(query)}`;
      }
    }

    request<Color[]>({
      endpoint: `/colors${queryString}`,
      onSuccess: setColors,
      onFailure: (error) => console.error("Error fetching colors:", error),
    });
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    fetchColors(query, searchType);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as "name" | "hex";
    setSearchType(type);
    fetchColors(search, type);
  };

  const addColor = () => {
    if (!newColor.name || !/^#([0-9A-Fa-f]{3}){1,2}$/.test(newColor.hex)) {
      setErrorMessage("Please enter a valid name and hex code.");
      return;
    }

    request<Color>({
      endpoint: "/colors",
      method: "POST",
      body: JSON.stringify(newColor),
      onSuccess: (data) => {
        setColors((prev) => [...prev, data]);
        setNewColor({ name: "", hex: "" });
        setErrorMessage("");
      },
      onFailure: (error) => setErrorMessage(error),
    });
  };

  const deleteColor = (colorId: number) => {
    request({
      endpoint: `/colors/${colorId}`,
      method: "DELETE",
      onSuccess: () => {
        setColors((prev) => prev.filter((color) => color.id !== colorId));
      },
      onFailure: (error) => {
        console.error("Failed to delete color:", error);
        setErrorMessage(error);
      },
    });
  };

  const updateColor = () => {
    if (
      !editColor ||
      !editColor.name ||
      !/^#([0-9A-Fa-f]{3}){1,2}$/.test(editColor.hex)
    ) {
      setErrorMessage("Please enter a valid name and hex code.");
      return;
    }

    request<Color>({
      endpoint: `/colors/${editColor.id}`,
      method: "PUT",
      body: JSON.stringify(editColor),
      onSuccess: (updatedData) => {
        setColors((prev) =>
          prev.map((color) =>
            color.id === updatedData.id ? updatedData : color
          )
        );
        setEditColor(null);
        setErrorMessage("");
      },
      onFailure: (error) => setErrorMessage(error),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Color Manager</h1>

      <Search
        search={search}
        searchType={searchType}
        onSearchChange={handleSearchChange}
        onSearchTypeChange={handleSearchTypeChange}
      />

      <ColorForm
        newColor={newColor}
        setNewColor={setNewColor}
        addColor={addColor}
        errorMessage={errorMessage}
      />

      <ColorTable
        colors={colors}
        editColor={editColor}
        setEditColor={setEditColor}
        updateColor={updateColor}
        deleteColor={deleteColor}
      />
    </div>
  );
}
