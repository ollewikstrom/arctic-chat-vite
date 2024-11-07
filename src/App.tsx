import { Route, Routes } from "react-router-dom";
import "./App.css";

import Admin from "./routes/admin/Admin";
import Room from "./routes/rooms/Room";
import WaitingRoom from "./routes/WaitingRoom";
import Navbar from "./components/Navbar";
import Experiment from "./routes/rooms/Experiment";

function App() {
  return (
    <>
      <Navbar />

      <section className="min-h-container relative">
        <Routes>
          <Route path="/admin/" element={<Admin />} />
          <Route path="/admin/:currentPath" element={<Admin />} />
          <Route path="/*" element={<WaitingRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/room/:roomId/team/:teamId" element={<Experiment />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
