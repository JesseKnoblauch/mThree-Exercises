import { Link } from "react-router-dom";

const Dvd = (props) => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.release}</td>
      <td>{props.director}</td>
      <td>{props.rating}</td>
      <td>
        <Link to={"/edit/" + props.id}>
          <button className="btn btn-info">Edit</button>
        </Link>
      </td>
      <td>
        <button
          onClick={() => {
            props.deleteHandler(props.id);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Dvd;
