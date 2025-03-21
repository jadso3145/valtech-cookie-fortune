import React from "react";
import { useIntl } from "react-intl";
import { Button, Modal, Input } from "vtex.styleguide";
import { adminTexts } from "../../utils/messages";
import { ModalTableProps } from "../../typings/cookiesFortune";

const ModalTable = (props: ModalTableProps) => {
  const {
    isModalOpen,
    setIsModalOpen,
    newFortune,
    setNewFortune,
    setCurrentPage,
    addFortune,
    setCurrentItemFrom,
    setCurrentItemTo,
    tableLength,
    loading,
  } = props;
  const intl = useIntl();
  const { formatMessage } = intl;

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} disabled={loading}>
        {formatMessage(adminTexts.addPhrase)}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formatMessage(adminTexts.modalTitle)}
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button
                variation="tertiary"
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                {formatMessage(adminTexts.cancel)}
              </Button>
            </span>
            <span>
              <Button
                variation="primary"
                onClick={async () => {
                  setIsModalOpen(false);
                  if (await addFortune(newFortune)) {
                    setNewFortune("");
                    setCurrentPage(0);
                    setCurrentItemFrom(1);
                    setCurrentItemTo(tableLength);
                  }
                }}
                disabled={loading}
              >
                {formatMessage(adminTexts.add)}
              </Button>
            </span>
          </div>
        }
      >
        <Input
          autoFocus
          placeholder={formatMessage(adminTexts.typesPhrase)}
          label={formatMessage(adminTexts.labelPhrase)}
          value={newFortune}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewFortune(e.target.value)
          }
          disabled={loading}
        />
        <div className="mb3" />
      </Modal>
    </>
  );
};

export default ModalTable;
