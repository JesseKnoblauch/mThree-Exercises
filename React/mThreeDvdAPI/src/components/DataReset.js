import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DataReset = () => {
  const [state, setState] = useState({ dvdList: [] });
  let navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  function resetData() {
    state.dvdList.map((dvd) => {
      deleteDVD(dvd.id);
    });

    navigate("/success");
  }

  async function deleteDVD(id) {
    const res = await fetch(
      "http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/" + id,
      { method: "DELETE" }
    );
  }

  async function getData() {
    let res = await fetch(
      "http://dvd-library.us-east-1.elasticbeanstalk.com/dvds"
    );

    let data = await res.json();

    setState({ ...state, dvdList: data });
  }

  return (
    <>
      <h2 className="text-center m-3">Reset Data?</h2>
      <div className="row">
        <div className="col-md-1 offset-md-5">
          <Link to="/">
            <button className="btn btn-danger">Back</button>
          </Link>
        </div>

        <div className="col-md-1">
          <button
            onClick={() => {
              resetData();
            }}
            className="btn btn-success"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default DataReset;
