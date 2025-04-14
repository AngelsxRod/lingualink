import React, { useState, useEffect } from "react";

export const Sidebar = ({ tags, onFilterChange }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {
    onFilterChange({ tags: selectedTags, sortOrder });
  }, [selectedTags, sortOrder, onFilterChange]);

  return (
    <div className="">
      <div className="fixed top-0 left-0 h-full bg-gray-100 shadow-lg z-40 w-64 p-4">
        <h2 className="text-lg font-bold mb-4">Filtros</h2>

        {/* Filtro por Tags */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Filtrar por Tags</h3>
          <ul className="space-y-2">
            {tags.map((tag) => (
              <li key={tag}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={tag}
                    onChange={() => handleTagChange(tag)}
                    checked={selectedTags.includes(tag)}
                  />
                  <span>{tag}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Ordenar */}
        <div>
          <h3 className="font-semibold mb-2">Ordenar por</h3>
          <ul className="space-y-2">
            <li>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sortOrder"
                  value="mostSearched"
                  onChange={() => handleSortChange("mostSearched")}
                  checked={sortOrder === "mostSearched"}
                />
                <span>Más buscados</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sortOrder"
                  value="leastSearched"
                  onChange={() => handleSortChange("leastSearched")}
                  checked={sortOrder === "leastSearched"}
                />
                <span>Menos buscados</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};