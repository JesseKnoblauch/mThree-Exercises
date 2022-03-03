import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Table from "./components/Table";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import DataReset from "./components/DataReset";
import Success from "./components/Success";

function App() {
  return (
    <div className="container" style={{ marginTop: "15px" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="create" element={<CreateForm />} />
          <Route path="edit/:id" element={<EditForm />} />
          <Route path="reset" element={<DataReset />} />
          <Route path="success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
