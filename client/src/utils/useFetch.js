import { useState, useEffect, useCallback } from "react";

const useFetch = (url, params) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const doFetch = useCallback(() => {
    return fetch(url + params)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => setError(e));
  }, [params]);
  return [{ data, error }, doFetch];
};

export default useFetch;
