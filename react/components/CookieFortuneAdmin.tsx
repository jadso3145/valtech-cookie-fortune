import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Table } from "vtex.styleguide";
import styles from './stylesAdmin.css'

const API_KEY = "vtexappkey-valtech-GCPGGL"; // Reemplaza con tu API Key
const API_TOKEN =
  "QOFKEXUFPPJOUAGFAFSZPDIJDLDHWZONLXOXOZLOZGRWTNSOCOETMEAYSYDKFULABEVSASRXKGZVABTOAKCYIJNZGBYAYLKOCIUMAIUABOLKXFIXEQMJTEFXFMRICGQO"; // Reemplaza con tu API Token

interface Fortune {
  id: string;
  CookieFortune: string;
}

const CookieFortuneAdmin = () => {
  const [fortunes, setFortunes] = useState<
    { id: string; CookieFortune: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFortune, setNewFortune] = useState("");
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentItemFrom, setCurrentItemFrom] = useState<number>(1);
  const [currentItemTo, setCurrentItemTo] = useState<number>(5);
  const [tableLength, setTableLength] = useState<number>(10);
  const [itemsLength, setItemsLength] = useState<number>(0);
  const [slicedData, setSlicedData] = useState<Fortune[]>([]);

  const authHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Vtex-Use-Https": "true",
    "X-VTEX-API-AppKey": API_KEY,
    "X-VTEX-API-AppToken": API_TOKEN,
  };

  const fetchFortunes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/dataentities/CF/search?_fields=id,CookieFortune&_sort=createdIn DESC`,
        {
          method: "GET",
          headers: {
            ...authHeaders,
            "REST-Range": "resources=0-400",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setFortunes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(fortunes, loading, error);

  const addFortune = async () => {
    try {
      const response = await fetch(`/api/dataentities/CF/documents`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          CookieFortune: newFortune,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setNewFortune("");
      setIsModalOpen(false);
      // Reiniciar la paginación a la primera página
      setCurrentPage(0);
      setCurrentItemFrom(1);
      setCurrentItemTo(tableLength);
      // Agregar un retraso para darle tiempo a la API
      setTimeout(() => fetchFortunes(), 500);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const deleteFortune = async (id: string) => {
    try {
      const response = await fetch(`/api/dataentities/CF/documents/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Actualizar el estado eliminando la frase sin hacer otra petición
      setFortunes((prevFortunes) =>
        prevFortunes.filter((fortune) => fortune.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFortunes();
  }, []);

  const tableSchema = {
    properties: {
      id: {
        type: "string",
        title: "ID",
      },
      CookieFortune: {
        type: "string",
        title: "Fortune Message",
      },
    },
  };

  const lineActions = [
    {
      label: () => `Delete`,
      isDangerous: true,
      onClick: ({ rowData }: { rowData: Fortune }) => deleteFortune(rowData.id),
    },
  ];

  // Actualizar los datos paginados cuando cambian los datos de fortunes
  useEffect(() => {
    if (fortunes.length > 0) {
      setItemsLength(fortunes.length); // Total de elementos
      const itemFrom = currentPage * tableLength + 1;
      const itemTo = Math.min(itemFrom + tableLength - 1, fortunes.length);
      const sliced = fortunes.slice(itemFrom - 1, itemTo);
      setCurrentItemFrom(itemFrom);
      setCurrentItemTo(itemTo);
      setSlicedData(sliced);
    }
  }, [fortunes, currentPage, tableLength]);

  // Funciones de paginación con tipos
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
    const newTableLength = parseInt(value) || 5; // Convertir el string a número, con valor por defecto 5

    // Asegura que la página actual no se desborde
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

  return (
    <div className={styles.containerAdmin}>
      <>
        <Button className="flex justi" onClick={() => setIsModalOpen(true)}>Open modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm your name to continue"
          bottomBar={
            <div className="nowrap">
              <span className="mr4">
                <Button
                  variation="tertiary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
              </span>
              <span>
                <Button
                  variation="primary"
                  onClick={() => {
                    setIsModalOpen(false);
                    addFortune();
                  }}
                >
                  Add New Fortune
                </Button>
              </span>
            </div>
          }
        >
          <Input
            autoFocus
            placeholder="Type your name...."
            label="Name"
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNewFortune(e.target.value)}
          />
          <div className="mb3" />
        </Modal>
      </>

      {fortunes.length > 0 && (
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
              textShowRows: "Show rows",
              textOf: "of",
              totalItems: itemsLength,
              rowsOptions: [10, 5, 15, 25],
            }}
          />
        </>
      )}
    </div>
  );
};

export default CookieFortuneAdmin;
