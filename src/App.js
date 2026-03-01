import { useState } from "react";
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
  const [user, setUser] = useState({});
  
  return (
    <div>
      {page === "home" && <Home setPage={setPage} />}
      {page === "practice" && (
        <TestSetup setPage={setPage} setTime={setTime} time={time} />
      )}
      {page === "test" && (
        <Test time={time} setPage={setPage} setResult={setResult} user={user} setUser={setUser} />
      )}
      {page === "result" && <Result result={result} setPage={setPage} />}
      {page === "history" && <History setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} user={user} />}
      {page === "register" && <Register setPage={setPage} setUser={setUser} />}
    </div>
  );
}

export default App;
