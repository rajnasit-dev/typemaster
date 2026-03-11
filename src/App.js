import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TestSetup from "./components/TestSetup";
import Test from "./components/Test";
import Result from "./components/Result";
import History from "./components/History";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [page, setPage] = useState("home");
  const [time, setTime] = useState(null);
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  
  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  const addHistory = (res) => {
    setResult(res);
    if (user) {
      const entry = { ...res, date: new Date().toISOString(), duration: time };
      setUsers((prev) =>
        prev.map((u) =>
          u.email === user.email
            ? { ...u, history: [entry, ...u.history] }
            : u
        )
      );
    }
  };

  const currentUser = users.find((u) => u.email === user?.email);

  return (
    <div>
      <Navbar setPage={setPage} user={user} onLogout={handleLogout} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "practice" && (
        <TestSetup setPage={setPage} setTime={setTime} time={time} />
      )}
      {page === "test" && (
        <Test time={time} setPage={setPage} setResult={addHistory} />
      )}
      {page === "result" && <Result result={result} setPage={setPage} />}
      {page === "history" && (
        <History setPage={setPage} history={currentUser?.history || []} />
      )}
      {page === "login" && (
        <Login setPage={setPage} users={users} setUser={setUser} />
      )}
      {page === "register" && (
        <Register setPage={setPage} setUser={setUser} users={users} setUsers={setUsers} />
      )}
    </div>
  );
}

export default App;
