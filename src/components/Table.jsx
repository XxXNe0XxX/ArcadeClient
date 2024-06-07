import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Table = ({ data, rowsPerPage = 10, title, onEdit = false }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  if (!data || data.length === 0) return <p>No data available</p>;

  const columns = Object.keys(data[0]);

  const filteredData = data.filter((row) =>
    columns.some((column) =>
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

  // Create placeholder rows if necessary
  const rowsToDisplay =
    currentData.length < rowsPerPage
      ? [...currentData, ...Array(rowsPerPage - currentData.length).fill(null)]
      : currentData;

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex px-2 justify-between items-center w-full">
        <h1 className=" text w-[60vw] text-wrap ">{title}</h1>
        <div className="flex  items-center gap-2   ">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          <input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" my-2 rounded-md px-1 border max-w-[40vw]"
          />
        </div>
      </div>
      <div className=" overflow-scroll max-h-[70vh] w-screen">
        <table className=" bg-white border border-gray-200 w-full p-1">
          <thead>
            <tr>
              {onEdit ? (
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  <h1>Edit</h1>
                </th>
              ) : (
                <th></th>
              )}
              {columns.map((column) => (
                <th
                  key={column}
                  onClick={() => handleColumnClick(column)}
                  className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                >
                  <h1 className="flex  gap-2">
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
                {onEdit && row ? (
                  <td>
                    <button
                      className="text-color2 text-center w-full"
                      onClick={() => onEdit(row)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
                {columns.map((column) => (
                  <td key={column} className="p-1 border-b text-color2">
                    {row ? row[column] : <span>&nbsp;</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex max-w-[800px] justify-between items-center  w-screen p-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
