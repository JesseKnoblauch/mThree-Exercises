import { useState, useEffect } from "react";

function useFetch(url, options) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiCall();
  }, []);

  async function apiCall() {
    try {
      let response = await fetch(url, options);
      let resData = await response.json();
      setData(resData);
    } catch (err) {
      setError(err);
    }
  }

  return [data, error];
}

export default useFetch;
