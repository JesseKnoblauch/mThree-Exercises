import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dvd from "./Dvd.js";

const Table = () => {
  const [state, setState] = useState({
    dvdList: [],
    searchCategory: "title",
    searchField: "",
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let res = await fetch(
      "http://dvd-library.us-east-1.elasticbeanstalk.com/dvds"
    );

    let data = await res.json();

    setState({ ...state, dvdList: data });
  }

  async function deleteHandler(id) {
    const res = await fetch(
      "http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/" + id,
      { method: "DELETE" }
    );
    getData();
  }

  function changeHandler(e) {
    setState({ ...state, [e.target.id]: e.target.value });
  }

  async function searchHandler() {
    if (state.searchField === "") getData();
    else {
      let res = await fetch(
        "http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/" +
          state.searchCategory +
          "/" +
          state.searchField
      );

      let data = await res.json();

      setState({ ...state, dvdList: data });
    }
  }

  return (
    <>
      <div id="dvdTableDiv">
        <h1>DVD Library</h1>
        <div className="row">
          <div id="addDVDButton" className="col-md-3">
            <Link to="/create">
              <button id="create-dvd-button" className="btn btn-primary">
                Create DVD
              </button>
            </Link>
          </div>

          <form role="form" id="search-form" className="col-md-9">
            <div className="row">
              <div className="col-md-2">
                <button
                  type="button"
                  id="searchButton"
                  className="btn btn-success"
                  onClick={() => {
                    searchHandler();
                  }}
                >
                  Search
                </button>
              </div>

              <div className="col-md-4">
                <select
                  id="searchCategory"
                  name="category"
                  className="form-control"
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  required
                >
                  <option value="title">Title</option>
                  <option value="year">Release Year</option>
                  <option value="director">Director</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  {...(state.searchCategory === "year"
                    ? { type: "number" }
                    : { type: "text" })}
                  placeholder="Search Term"
                  name="search"
                  maxLength="35"
                  required
                  id="searchField"
                  className="form-control"
                />
              </div>
            </div>
          </form>
        </div>

        <hr />

        <table
          id="contactTable"
          className="table table-hover table-bordered table-striped text-center"
        >
          <thead className="thead-dark">
            <tr>
              <th width="30%">Title</th>
              <th width="20%">Release Date</th>
              <th width="20%">Director</th>
              <th width="10%">Rating</th>
              <th width="10%"></th>
              <th width="10%"></th>
            </tr>
          </thead>

          <tbody id="contentRows">
            {state.dvdList.map((dvd) => {
              return (
                <Dvd
                  key={dvd.id}
                  id={dvd.id}
                  title={dvd.title}
                  release={dvd.releaseYear}
                  director={dvd.director}
                  rating={dvd.rating}
                  deleteHandler={deleteHandler}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
