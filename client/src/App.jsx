import AddList from "../components/AddList";
import EditTask from "../components/EditTask";
import TaskList from "../components/TaskList";
import "./App.css";
import { Toaster } from "react-hot-toast";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "../components/card";

function App() {
  return (
    <>
      <div className="App-container">
        <Toaster position="top-center" reverseOrder></Toaster>

        <Router>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-list" element={<AddList />} />
            <Route path="/edit-task" element={<EditTask />} />
            <Route path="/task/:id" element={<Card />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
