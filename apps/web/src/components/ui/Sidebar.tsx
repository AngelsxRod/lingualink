import { useState, useEffect } from "react";
import { Check, Funnel } from "lucide-react";
import { Button } from "./Button";

interface SidebarProps {
  tags: string[];
  onFilterChange: (filters: { tags: string[]; sortBy: string }) => void;
}

export const Sidebar = ({ tags, onFilterChange }: SidebarProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del Sidebar en móvil

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  const clearSortOrder = () => {
    setSortOrder("");
  };

  useEffect(() => {
    onFilterChange({ tags: selectedTags, sortBy: sortOrder });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags, sortOrder]);

  return (
    <>
      {/* Botón para abrir/cerrar el Sidebar en móvil */}
      <Button
        className="py-2 fixed bottom-20 right-8 z-30 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Funnel className="w-6 h-6" />
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white text-gray-800 shadow-lg p-6 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6">Filtros</h2>

        {/* Filtro por Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <ul className="space-y-3">
            {tags.map((tag) => (
              <li key={tag}>
                <label
                  htmlFor={`check-${tag}`}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      value={tag}
                      onChange={() => handleTagChange(tag)}
                      id={`check-${tag}`}
                      className="hidden peer"
                    />

                    <div className="w-6 h-6 border-2 border-gray-300 rounded-md peer-checked:border-emerald-500 peer-checked:bg-emerald-500 flex items-center justify-center">
                      <Check className="w-full h-full text-white " />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{tag}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Filtro por Orden */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Ordenar por</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="sortOrder"
                value="mostVoted"
                checked={sortOrder === "mostVoted"}
                onChange={() => handleSortChange("mostVoted")}
                className="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-sm font-medium">Más votados</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="sortOrder"
                value="leastVoted"
                checked={sortOrder === "leastVoted"}
                onChange={() => handleSortChange("leastVoted")}
                className="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-sm font-medium">Menos votados</span>
            </label>
          </div>
          <button
            onClick={clearSortOrder}
            className="mt-2 text-sm text-blue-600 underline"
          >
            Limpiar selección
          </button>
        </div>
      </div>

      {/* Fondo oscuro al abrir el Sidebar en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};
