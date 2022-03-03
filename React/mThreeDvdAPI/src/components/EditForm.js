import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditForm = () => {
  const [state, setState] = useState({
    title: "",
    releaseYear: "",
    director: "",
    rating: "",
    notes: "",
    successful: undefined,
  });

  async function getData() {
    let res = await fetch(
      `http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/${id}`
    );

    let data = await res.json();

    setState(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const { id } = useParams();

  async function editDVD(event) {
    event.preventDefault();
    console.log(state);
    const res = await fetch(
      `http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/${id}`,
      {
        method: "PUT",
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
  }

  function onChangeHandler(e) {
    setState({ ...state, [e.target.id]: e.target.value });
  }

  function setSuccessful(value) {
    setState({
      ...state,
      successful: value,
    });
  }

  if (state.successful === true) return <Navigate to="/" />;

  return (
    <>
      <div id="editFormDiv">
        <h2>Edit Contact</h2>
        <form
          role="form"
          id="editForm"
          onSubmit={(e) => {
            editDVD(e);
          }}
        >
          <div className="form-group row">
            <label htmlFor="title" className="col-md-3 control-label">
              DVD Title:
            </label>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="title"
                defaultValue={state.title}
                required
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="releaseYear" className="col-md-3 control-label">
              Release Year:
            </label>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                id="releaseYear"
                defaultValue={state.releaseYear}
                placeholder="Enter Release Year"
                required
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="director" className="col-md-3 control-label">
              Director:
            </label>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                id="director"
                defaultValue={state.director}
                placeholder="Enter Director"
                required
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="rating" className="col-md-3 control-label">
              Rating:
            </label>
            <div className="col-md-2">
              <select
                id="rating"
                defaultValue={state.rating}
                name="rating"
                className="form-control"
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                required
              >
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
                defaultValue={state.notes}
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
              <button type="submit" id="editButton" className="btn btn-success">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
