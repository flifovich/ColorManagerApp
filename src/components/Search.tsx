// Search.tsx
import React from "react";

type SearchProps = {
  search: string;
  searchType: "name" | "hex";
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Search: React.FC<SearchProps> = ({
  search,
  searchType,
  onSearchChange,
  onSearchTypeChange,
}) => {
  return (
    <div className="mt-4 flex">
      <input
        type="text"
        placeholder="Select to search..."
        value={search}
        onChange={onSearchChange}
        className="border p-2 mr-2"
      />
      <select
        onChange={onSearchTypeChange}
        value={searchType}
        className="border p-2 mr-2"
      >
        <option value="name">Search by Name</option>
        <option value="hex">Search by Hex</option>
      </select>
    </div>
  );
};

export default Search;
