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

const GeneralTable = ({
  data,
  columns,
  page = "1",
  per_page = "5",
  canSort = true,
  canFilter = true,
  columnsWidth,
  route,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [slicedData, setSlicedData] = useState([]);
  const [order, setOrder] = useState(Array(columns.length).fill(0));
  const [filters, setFilters] = useState({});

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const slicedData = filteredData.slice(start, end);

    if (slicedData.length < parseInt(per_page) && slicedData.length > 0) {
      const nullsToAdd = Array(parseInt(per_page) - slicedData.length).fill(
        null
      );
      const newData = [...slicedData, ...nullsToAdd];
      setSlicedData(newData);
    } else {
      setSlicedData(slicedData);
    }
  }, [page, per_page, filteredData, order]);

  const handleFilterChange = (columnKey, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [columnKey]: value }));
    applyFilters(columnKey, value);
  };

  const applyFilters = (columnKey, filterValue) => {
    let newFilteredData = data;

    // Apply all filters except the current one
    Object.entries(filters).forEach(([key, value]) => {
      const column = columns.find((col) => col.key === key);
      if (key !== columnKey && value !== "") {
        newFilteredData = newFilteredData.filter((row) => {
          const cellValue = column.nestedPath
            ? column.nestedPath.split(".").reduce((obj, key) => obj?.[key], row)
            : row[key];
          return cellValue
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      }
    });

    // Apply the current filter
    if (columnKey && filterValue !== "") {
      const column = columns.find((col) => col.key === columnKey);
      newFilteredData = newFilteredData.filter((row) => {
        const cellValue = column.nestedPath
          ? column.nestedPath.split(".").reduce((obj, key) => obj?.[key], row)
          : row[columnKey];
        return cellValue
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    }

    setFilteredData(newFilteredData);
  };

  const orderData = (columnKey) => {
    const newOrder = order.map((value, index) =>
      index === columnKey ? (value === 0 ? 1 : value * -1) : 0
    );
    setOrder(newOrder);

    const column = columns.find((col) => col.key === columns[columnKey].key);
    const orderedData = [...filteredData].sort((a, b) => {
      const aValue = column.nestedPath
        ? a[column.key][column.nestedPath]
        : a[column.key];
      const bValue = column.nestedPath
        ? b[column.key][column.nestedPath]
        : b[column.key];

      if (aValue < bValue) return newOrder[columnKey] === 1 ? -1 : 1;
      if (aValue > bValue) return newOrder[columnKey] === 1 ? 1 : -1;
      return 0;
    });

    setFilteredData(orderedData);
  };

  const renderFilterInput = (column) => {
    const { key, filterType, options } = column;

    switch (filterType) {
      case "text":
        return (
          <input
            type="text"
            value={filters[key] || ""}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="w-full h-full border text-sm font-normal text-black"
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={filters[key] || ""}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="w-full h-full border text-sm font-normal text-black"
          />
        );
      case "boolean":
        return (
          <select
            value={filters[key] || ""}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="w-full h-full border text-sm font-normal text-black"
          >
            <option value="">Select an option</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      case "select":
        return options ? (
          <select
            value={filters[key] || ""}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="w-full h-full border text-sm font-normal text-black"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : null;
      default:
        return null;
    }
  };

  const renderCellContent = (column, value) => {
    const { filterType, nestedPath } = column;

    if (nestedPath) {
      const nestedValue = value[nestedPath];
      return renderCellContent({ filterType }, nestedValue);
    }

    if (filterType) {
      switch (filterType) {
        case "boolean":
          return value ? "True" : "False";
        default:
          return value;
      }
    }

    // If no filterType or nestedPath is defined, simply return the value
    return value;
  };
  return (
    <div className="w-5/6 m-4">
      {data && (
        <TableContainer className="rounded-md shadow-xl">
          <Table size="sm">
            <Thead>
              <Tr className="bg-[#7A72DE]">
                {columns.map(({ label, key }, index) => (
                  <Th key={key} className={`${columnsWidth[index]}`}>
                    {canSort && (
                      <button
                        className="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                        onClick={() => orderData(index)}
                      >
                        <span>{label}</span>
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
                    )}
                    {!canSort && (
                      <span className="font-bold text-black">{label}</span>
                    )}
                  </Th>
                ))}
              </Tr>
              {canFilter && (
                <Tr>
                  {columns.map(({ key, filterType, options }) => (
                    <Th key={key}>
                      {renderFilterInput({ key, filterType, options })}
                    </Th>
                  ))}
                </Tr>
              )}
            </Thead>
            <Tbody className="bg-[#F6F3FA]">
              {slicedData.map((row, index) => (
                <Tr
                  key={`${row ? row[columns[0].key] : index}`}
                  className="hover:bg-[#E0DFFF]"
                >
                  {row === null ? (
                    <Td
                      colSpan={columns.length}
                      className="text-[#F6F3FA] hover:text-[#E0DFFF] px-4 py-2 text-left"
                    >
                      Null
                    </Td>
                  ) : (
                    columns.map(({ key, filterType, nestedPath }) => (
                      <Td key={key} className="px-4 py-2">
                        <div className="text-wrap">
                          {renderCellContent(
                            { filterType, nestedPath },
                            row[key]
                          )}
                        </div>
                      </Td>
                    ))
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <HStack mt={4}>
        <PaginationControls
          hasNextPage={end < filteredData.length}
          hasPrevPage={start > 0}
          totalRecords={filteredData.length}
          pageSize={per_page}
          route={route}
        ></PaginationControls>
      </HStack>
    </div>
  );
};

export default GeneralTable;
