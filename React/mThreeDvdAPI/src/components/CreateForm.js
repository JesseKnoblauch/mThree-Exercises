import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

const CreateForm = () => {
  const [state, setState] = useState({
    title: "",
    releaseYear: "",
    director: "",
    rating: "",
    notes: "",
    successful: undefined,
  });

  async function addDVD(event) {
    event.preventDefault();
    const res = await fetch(
      "http://dvd-library.us-east-1.elasticbeanstalk.com/dvd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: state.title.toString(),
          releaseYear: state.releaseYear.toString(),
          director: state.director.toString(),
          rating: state.rating.toString(),
          notes: state.notes.toString(),
        }),
      }
    );
    setSuccessful(res.ok);
    resetState();
  }

  if (state.successful === true) return <Navigate to="/" />;

  function onChangeHandler(e) {
    setState({ ...state, [e.target.id]: e.target.value });
  }

  function setSuccessful(value) {
    setState({
      ...state,
      successful: value,
    });
  }

  function resetState() {
    setState({
      title: "",
      releaseYear: "",
      director: "",
      rating: "",
      notes: "",
      successful: undefined,
    });
  }

  return (
    <div id="addFormDiv">
      <h1>Add New DVD</h1>
      <hr />
      <form
        role="form"
        id="addForm"
        onSubmit={(e) => {
          addDVD(e);
        }}
      >
        <div className="form-group row">
          <label htmlFor="title" className="col-md-3 control-label">
            DVD Title:
          </label>
          <div className="col-md-6">
            <input
              onChange={(e) => {
                onChangeHandler(e);
              }}
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter Title"
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="releaseYear" className="col-md-3 control-label">
            Release Year:
          </label>
          <div className="col-md-6">
            <input
              onChange={(e) => {
                onChangeHandler(e);
              }}
              type="number"
              className="form-control"
              id="releaseYear"
              placeholder="Enter Release Year"
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="director" className="col-md-3 control-label">
            Director:
          </label>
          <div className="col-md-6">
            <input
              onChange={(e) => {
                onChangeHandler(e);
              }}
              type="text"
              className="form-control"
              id="director"
              placeholder="Enter Director"
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="rating" className="col-md-3 control-label">
            Rating:
          </label>
          <div className="col-md-2">
            <select
              onChange={(e) => {
                onChangeHandler(e);
              }}
              id="rating"
              name="rating"
              className="form-control"
              required
              defaultValue={""}
            >
              <option value="" disabled hidden>
                Choose Rating
              </option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="M">M</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="notes" className="col-md-3 control-label">
            Notes:
          </label>
          <div className="col-md-6">
            <textarea
              onChange={(e) => {
                onChangeHandler(e);
              }}
              type="text"
              className="form-control"
              id="notes"
              placeholder="Enter Note"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-2">
            <Link to="/">
              <button
                type="button"
                id="cancelButton"
                className="btn btn-danger"
              >
                Cancel
              </button>
            </Link>
          </div>
          <div className="col-md-2">
            <button type="submit" id="addButton" className="btn btn-success">
              Create DVD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
