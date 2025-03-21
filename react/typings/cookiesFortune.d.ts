export interface ModalTableProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  newFortune: string;
  setNewFortune: (newFortune: string) => void;
  setCurrentPage: (currentPage: number) => void;
  addFortune: (newFortune: string) => Promise<boolean>;
  setCurrentItemFrom: (currentItemFrom: number) => void;
  setCurrentItemTo: (currentItemTo: number) => void;
  tableLength: number;
  fetchFortunes: () => Promise<void>;
  loading: boolean;
}

export interface PaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  currentItemFrom: number;
  setCurrentItemFrom: (currentItemFrom: number) => void;
  currentItemTo: number;
  setCurrentItemTo: (currentItemTo: number) => void;
  tableLength: number;
  setTableLength: (tableLength: number) => void;
  fortunes: Fortune[];
  deleteFortune: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface Fortune {
  id: string;
  CookieFortune: string;
}
