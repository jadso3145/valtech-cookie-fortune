import React, { useEffect, useState } from "react";
import styles from "./stylesAdmin.css";
import { useIntl } from "react-intl";
import { adminTexts } from "../../utils/messages";
import { useFortuneAPI } from "../../utils/useFortuneAPI";
import TableAdmin from "./TableAdmin";
import ModalTable from "./ModalTable";

const CookieFortuneAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFortune, setNewFortune] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentItemFrom, setCurrentItemFrom] = useState<number>(1);
  const [currentItemTo, setCurrentItemTo] = useState<number>(5);
  const [tableLength, setTableLength] = useState<number>(10);

  const intl = useIntl();
  const { formatMessage } = intl;

  const { fortunes, loading, error, fetchFortunes, addFortune, deleteFortune } = useFortuneAPI();

  useEffect(() => {
    fetchFortunes();
  }, [fetchFortunes]);

  return (
    <div className={styles.containerAdmin}>
      <h1 className="mb-20">{formatMessage(adminTexts.getYourFortuneTitle)}</h1>
      <ModalTable
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newFortune={newFortune}
        setNewFortune={setNewFortune}
        fetchFortunes={fetchFortunes}
        addFortune={addFortune}
        setCurrentPage={setCurrentPage}
        setCurrentItemFrom={setCurrentItemFrom}
        setCurrentItemTo={setCurrentItemTo}
        tableLength={tableLength}
        loading={loading}
      />

      {loading ? (
        <div className={styles.loaderContainer}>
          <span className={styles.loader} />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className={styles.tableContainer}>
          <TableAdmin
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentItemFrom={currentItemFrom}
            setCurrentItemFrom={setCurrentItemFrom}
            currentItemTo={currentItemTo}
            setCurrentItemTo={setCurrentItemTo}
            tableLength={tableLength}
            setTableLength={setTableLength}
            fortunes={fortunes}
            deleteFortune={deleteFortune}
            loading={loading}
            error={error}
          />
        </div>
      ) }
    </div>
  );
};

export default CookieFortuneAdmin;
