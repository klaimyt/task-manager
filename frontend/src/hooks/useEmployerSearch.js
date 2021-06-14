import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";

export default function useEmployerSearch(query, role) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    let cancel;
    axios
      .get(`${config.API_URL}admin/search`, {
        params: { q: query, role: role },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        withCredentials: true,
      })
      .then((res) => setData(res.data))
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err);
      });
    return () => cancel();
  }, [query]);

  return { data, error };
}
