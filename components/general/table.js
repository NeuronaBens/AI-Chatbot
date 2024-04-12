"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
} from "@chakra-ui/react";
import PaginationControls from "@/components/general/pag-controls";

const GeneralTable = ({ data, columns, page, per_page }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [order, setOrder] = useState(Array(columns.length).fill(0));
  const [filters, setFilters] = useState({});

  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15

  const handleFilterChange = (filterKey, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue,
    }));
    debouncedApplyFilters(filterKey, filterValue);
  };

  const orderData = (columnIndex) => {
    const newOrder = [...order];
    newOrder[columnIndex] =
      order[columnIndex] === 0 ? 1 : order[columnIndex] * -1;
    setOrder(newOrder);

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[columns[columnIndex].dataKey];
      const bValue = b[columns[columnIndex].dataKey];

      if (columns[columnIndex].type === "number") {
        return order[columnIndex] * (aValue - bValue);
      } else if (columns[columnIndex].type === "boolean") {
        return order[columnIndex] * (aValue === bValue ? 0 : aValue ? -1 : 1);
      } else {
        return order[columnIndex] * aValue.localeCompare(bValue);
      }
    });

    setFilteredData(sortedData);
  };

  const applyFilters = (filterKey, filterValue) => {
    let newFilteredData = [...data];

    // Apply previous filters
    for (const [key, value] of Object.entries(filters)) {
      if (key !== filterKey && value !== "") {
        const column = columns.find((column) => column.dataKey === key);
        if (column.type === "number") {
          newFilteredData = newFilteredData.filter(
            (row) => row[key] === parseInt(value)
          );
        } else if (column.type === "boolean") {
          newFilteredData = newFilteredData.filter(
            (row) => row[key].toString() === value
          );
        } else {
          newFilteredData = newFilteredData.filter((row) =>
            row[key].toString().toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    }

    // Apply current filter
    if (filterValue !== "") {
      const column = columns.find((column) => column.dataKey === filterKey);
      if (column.type === "number") {
        newFilteredData = newFilteredData.filter(
          (row) => row[filterKey] === parseInt(filterValue)
        );
      } else if (column.type === "boolean") {
        newFilteredData = newFilteredData.filter(
          (row) => row[filterKey].toString() === filterValue
        );
      } else {
        newFilteredData = newFilteredData.filter((row) =>
          row[filterKey]
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      }
    }

    setFilteredData(newFilteredData);
  };

  const debouncedApplyFilters = debounce(applyFilters, 500);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  useEffect(() => {
    const slicedData = filteredData.slice(start, end);
    const paddedData =
      slicedData.length < Number(per_page)
        ? [
            ...slicedData,
            ...Array(Number(per_page) - slicedData.length).fill(null),
          ]
        : slicedData;
    setFilteredData(paddedData);
  }, [page, per_page, filteredData, order]);

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">General Table</h3>
      <TableContainer className="rounded-md shadow-xl">
        <Table size="sm">
          <Thead>
            <Tr className="bg-[#7A72DE]">
              {columns.map((column, index) => (
                <Th key={column.dataKey} className="w-1/6">
                  <button
                    className="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                    onClick={() => orderData(index)}
                  >
                    <span>{column.name}</span>
                    {order[index] === 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 7.639c-.63-.901-1.637-.884-2.236.038L6.09 24.323C5.491 25.245 5.9 26 7 26h23c1.1 0 1.483-.737.854-1.639L19.146 7.639z"
                        />
                      </svg>
                    )}
                    {order[index] === -1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 26.361c-.63.901-1.637.884-2.236-.038L6.09 9.677C5.491 8.754 5.9 8 7 8h23c1.1 0 1.483.737.854 1.639L19.146 26.361z"
                        />
                      </svg>
                    )}
                  </button>
                </Th>
              ))}
            </Tr>
            <Tr>
              {columns.map((column) => (
                <Th key={column.dataKey}>
                  {column.type === "select" ? (
                    <select
                      value={filters[column.dataKey] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.dataKey, e.target.value)
                      }
                      className="w-full h-full border text-sm font-normal text-black"
                    >
                      <option value="">Select an option</option>
                      {column.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : column.type === "boolean" ? (
                    <select
                      value={filters[column.dataKey] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.dataKey, e.target.value)
                      }
                      className="w-full h-full border text-sm font-normal text-black"
                    >
                      <option value="">Select an option</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={filters[column.dataKey] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.dataKey, e.target.value)
                      }
                      className="w-full h-full border text-sm font-normal text-black"
                    />
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody className="bg-[#F6F3FA]">
            {filteredData.map((row) => (
              <Tr key={row.id} className="hover:bg-[#E0DFFF]">
                {columns.map((column) => (
                  <Td
                    key={`${row.id}-${column.dataKey}`}
                    className="px-4 py-2 text-left"
                  >
                    {row[column.dataKey]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack mt={4}>
        <PaginationControls
          hasNextPage={end < filteredData.length}
          hasPrevPage={start > 0}
          totalRecords={filteredData.length}
          pageSize={per_page}
        ></PaginationControls>
      </HStack>
    </div>
  );
};

export default GeneralTable;
