import { Link } from "react-router-dom";

const Success = () => {
  return (
    <>
      <h2 className="text-center">Database has been reset!</h2>
      <div className="text-center m-3">
        <Link to="/">
          <button className=" btn btn-danger">Back</button>
        </Link>
      </div>
    </>
  );
};

export default Success;
