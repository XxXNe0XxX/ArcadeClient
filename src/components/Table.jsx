import {
  faEdit,
  faSearch,
  faTrash,
  faChartBar,
  faCheck,
  faTimes,
  faToggleOn,
  faInfoCircle,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useModal } from "../context/ModalProvider";

const Table = ({
  data,
  rowsPerPage = 10,
  title,
  onEdit = false,
  onDelete = false,
  onStatistics = false,
  onToggle = false,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const openModal = useModal();

  if (!data || data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center text-center h-64 border border-color4 p-2 max-w-[800px] w-full m-auto">
        <FontAwesomeIcon
          icon={faInfoCircle}
          size="3x"
          className="text-gray-400"
        />
        <p className="text-gray-600 mt-2">
          No hay informacion disponible por el momento.
        </p>
        <p className="text-gray-500">Intente mas tarde.</p>
      </div>
    );

  const columns = Object.keys(data[0]);

  const filteredData = data.filter((row) =>
    columns.some(
      (column) =>
        row[column] !== null &&
        row[column] !== undefined &&
        row[column].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const handleColumnClick = (column) => {
    let direction = "ascending";
    if (sortConfig.key === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: column, direction });
  };

  // Pagination logic
  const totalRows = sortedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const currentData = sortedData.slice(startRow, startRow + rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDeleteClick = (item) => {
    openModal({
      type: "confirmation",
      message: `Confirmar?`,
      onConfirm: () => {
        if (onDelete) {
          onDelete(item);
        }
      },
    });
  };

  // Create placeholder rows if necessary
  const rowsToDisplay =
    currentData.length < rowsPerPage
      ? [...currentData, ...Array(rowsPerPage - currentData.length).fill(null)]
      : currentData;

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex px-2 justify-between items-center w-full">
        <h1 className="text w-[60vw] text-wrap">{title}</h1>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          <input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="my-2 rounded-md px-1 border max-w-[40vw]"
          />
        </div>
      </div>
      <div className="overflow-scroll h-[70vh] w-full max-w-screen">
        <table className="bg-white border border-gray-200 w-full h-full p-1">
          <thead>
            <tr>
              {onToggle ? (
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  <h1>{"Activar\nDesactivar"}</h1>
                </th>
              ) : (
                <th></th>
              )}
              {onEdit ? (
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  <h1>Editar</h1>
                </th>
              ) : (
                <th></th>
              )}
              {onDelete ? (
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  <h1>Eliminar</h1>
                </th>
              ) : (
                <th></th>
              )}
              {onStatistics ? (
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  <h1>Estadisticas</h1>
                </th>
              ) : (
                <th></th>
              )}
              {columns.map((column) => (
                <th
                  key={column}
                  onClick={() => handleColumnClick(column)}
                  className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                >
                  <h1 className="flex gap-2">
                    {column}
                    {sortConfig.key === column ? (
                      sortConfig.direction === "ascending" ? (
                        <span className="block w-4">▲</span>
                      ) : (
                        <span className="block w-4">▼</span>
                      )
                    ) : (
                      <span className="block w-4">▲▼</span>
                    )}
                  </h1>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-color4" : ""}`}
              >
                {onToggle && row ? (
                  <td>
                    <button
                      className="text-color2 text-center w-full"
                      onClick={() => onToggle(row)}
                    >
                      {row.Running || row.Active ? (
                        <FontAwesomeIcon
                          className="text-color1 scale-125"
                          icon={faToggleOn}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-color1 scale-125"
                          icon={faToggleOff}
                        />
                      )}
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
                {onEdit && row ? (
                  <td>
                    <button
                      className="text-color2 text-center w-full"
                      onClick={() => onEdit(row)}
                    >
                      <FontAwesomeIcon className="scale-125" icon={faEdit} />
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
                {onDelete && row ? (
                  <td>
                    <button
                      className="text-color2 text-center w-full"
                      onClick={() => handleDeleteClick(row)}
                    >
                      <FontAwesomeIcon
                        className="text-color1 scale-125"
                        icon={faTrash}
                      />
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
                {onStatistics && row ? (
                  <td>
                    <button
                      className="text-color2 text-center w-full"
                      onClick={() => onStatistics(row)}
                    >
                      <FontAwesomeIcon
                        className="text-color3 scale-125"
                        icon={faChartBar}
                      />
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}

                {columns.map((column) => (
                  <td
                    key={column}
                    className="p-1 h-20 text-color2 text-sm text-center"
                  >
                    {row ? (
                      typeof row[column] === "boolean" ? (
                        row[column] ? (
                          <FontAwesomeIcon
                            className="text-green-600 scale-125"
                            icon={faCheck}
                          /> // Checkmark for true
                        ) : (
                          <FontAwesomeIcon
                            className="text-red-600 scale-125"
                            icon={faTimes}
                          /> // Cross for false
                        )
                      ) : (
                        row[column]
                      )
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex max-w-[800px] justify-between items-center w-screen p-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          {"<"}
        </button>
        <span>
          Pagina {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Table;
