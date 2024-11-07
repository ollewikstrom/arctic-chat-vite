import { Route, Routes } from "react-router-dom";
import "./App.css";

import Admin from "./routes/admin/Admin";
import Room from "./routes/Room";
import WaitingRoom from "./routes/WaitingRoom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-8rem)] relative">
        <Routes>
          <Route path="/admin/" element={<Admin />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<WaitingRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
