import React, { useEffect, useState } from "react";
import { Table } from "vtex.styleguide";
import { useIntl } from "react-intl";
import { adminTexts } from "../../utils/messages";
import { Fortune, PaginationProps } from "../../typings/cookiesFortune";

const TableAdmin = (props: PaginationProps) => {
  const {
    currentPage,
    setCurrentPage,
    currentItemFrom,
    setCurrentItemFrom,
    currentItemTo,
    setCurrentItemTo,
    tableLength,
    setTableLength,
    fortunes,
    deleteFortune,
    error,
  } = props;
  const [itemsLength, setItemsLength] = useState<number>(0);
  const [slicedData, setSlicedData] = useState<Fortune[]>([]);
  const intl = useIntl();
  const { formatMessage } = intl;

  const tableSchema = {
    properties: {
      id: { type: "string", title: "ID" },
      CookieFortune: { type: "string", title: formatMessage(adminTexts.fortuneMessage) },
    },
  };

  const lineActions = [
    {
      label: () => formatMessage(adminTexts.deleteFortune),
      isDangerous: true,
      onClick:  ({ rowData }: { rowData: Fortune }) => deleteFortune(rowData.id)
    },
  ];

  useEffect(() => {
    if (fortunes.length > 0) {
      setItemsLength(fortunes.length);
      const itemFrom = currentPage * tableLength + 1;
      const itemTo = Math.min(itemFrom + tableLength - 1, fortunes.length);
      const sliced = fortunes.slice(itemFrom - 1, itemTo);
      setCurrentItemFrom(itemFrom);
      setCurrentItemTo(itemTo);
      setSlicedData(sliced);
    } else {
      setItemsLength(0);
      setSlicedData([]);
      setCurrentItemFrom(1);
      setCurrentItemTo(0);
    }
  }, [fortunes, currentPage, tableLength]);

  const handleNextClick = () => {
    const newPage = currentPage + 1;
    const itemFrom = newPage * tableLength + 1;
    const itemTo = Math.min(itemFrom + tableLength - 1, fortunes.length);
    const data = fortunes.slice(itemFrom - 1, itemTo);
    goToPage(newPage, itemFrom, itemTo, data);
  };

  const handlePrevClick = () => {
    if (currentPage === 0) return;
    const newPage = currentPage - 1;
    const itemFrom = newPage * tableLength + 1;
    const itemTo = Math.min(itemFrom + tableLength - 1, fortunes.length);
    const data = fortunes.slice(itemFrom - 1, itemTo);
    goToPage(newPage, itemFrom, itemTo, data);
  };

  const goToPage = (
    currentPage: number,
    currentItemFrom: number,
    currentItemTo: number,
    slicedData: Fortune[]
  ): void => {
    setCurrentPage(currentPage);
    setCurrentItemFrom(currentItemFrom);
    setCurrentItemTo(currentItemTo);
    setSlicedData(slicedData);
  };

  const handleRowsChange = (
    _: React.ChangeEvent<HTMLSelectElement>,
    value: string
  ): void => {
    const newTableLength = parseInt(value) || 5;
    const maxPage = Math.max(0, Math.floor(itemsLength / newTableLength));
    const newPage = Math.min(currentPage, maxPage);
    const itemFrom = newPage * newTableLength + 1;
    const itemTo = Math.min(itemFrom + newTableLength - 1, fortunes.length);
    const sliced = fortunes.slice(itemFrom - 1, itemTo);
    setTableLength(newTableLength);
    setCurrentPage(newPage);
    setCurrentItemFrom(itemFrom);
    setCurrentItemTo(itemTo);
    setSlicedData(sliced);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Table
        fullWidth
        highlightOnHover
        items={slicedData}
        schema={tableSchema}
        lineActions={lineActions}
        pagination={{
          onNextClick: handleNextClick,
          onPrevClick: handlePrevClick,
          currentItemFrom: currentItemFrom,
          currentItemTo: currentItemTo,
          onRowsChange: handleRowsChange,
          textShowRows: formatMessage(adminTexts.showRows),
          textOf: formatMessage(adminTexts.outOf),
          totalItems: itemsLength,
          rowsOptions: [10, 5, 15, 25],
        }}
      />
    </>
  );
};

export default TableAdmin;
