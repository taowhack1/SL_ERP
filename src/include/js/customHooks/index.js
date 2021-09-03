import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const fetchData = () => setTrigger((prev) => !prev);

  useEffect(() => {
    setLoading("Loading...");
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    url &&
      axios
        .get(url, { cancelToken: source.token })
        .then((res) => {
          setLoading(false);
          res.data && setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError("Error. Can't fetch any data from the server.");
          console.error("error", err);
        });
    return () => {
      source.cancel();
    };
  }, [url, trigger]);

  return { data, loading, error, fetchData };
};

export { useFetch };
