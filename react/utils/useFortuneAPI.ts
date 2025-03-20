import { useState, useCallback } from "react";

const API_KEY = "vtexappkey-valtech-GCPGGL";
const API_TOKEN =
  "QOFKEXUFPPJOUAGFAFSZPDIJDLDHWZONLXOXOZLOZGRWTNSOCOETMEAYSYDKFULABEVSASRXKGZVABTOAKCYIJNZGBYAYLKOCIUMAIUABOLKXFIXEQMJTEFXFMRICGQO";

const authHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Vtex-Use-Https": "true",
  "X-VTEX-API-AppKey": API_KEY,
  "X-VTEX-API-AppToken": API_TOKEN,
};

interface Fortune {
  id: string;
  CookieFortune: string;
}

export const useFortuneAPI = () => {
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFortunes = useCallback(async () => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(
        `/api/dataentities/CF/search?_fields=id,CookieFortune&_sort=createdIn DESC&_t=${timestamp}`,
        {
          method: "GET",
          headers: { ...authHeaders, "REST-Range": "resources=0-400" },
        }
      );
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data: Fortune[] = await response.json();
      setFortunes(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFortune = useCallback(async (newFortune: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/dataentities/CF/documents`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ CookieFortune: newFortune }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      // Agregar un retraso para darle tiempo a la API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetchFortunes(); // Recargar los datos desde la API
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchFortunes]);

  const deleteFortune = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/dataentities/CF/documents/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      await fetchFortunes(); // Recargar los datos desde la API
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFortunes]);

  return { fortunes, loading, error, fetchFortunes, addFortune, deleteFortune };
};
