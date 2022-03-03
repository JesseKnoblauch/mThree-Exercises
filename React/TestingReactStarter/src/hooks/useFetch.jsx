import { useState, useEffect } from "react";

/* 
type defintion for paramaters
url: string
options: {}

Here  are the possible options of a fetch call.  The default one are marked with an *
{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
}

*/

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
