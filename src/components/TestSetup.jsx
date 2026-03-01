import TimeBox from "./TimeBox";

function TestSetup({ setPage, setTime, time }) {
  const startTest = () => {
    setTime(time);
    setPage("test");
  };

  return (
    <div className="setup">
      <h2>Select Duration</h2>
      <div className="setup-box">
        <label>Choose Test Duration</label>

        <div className="selecttime">
          <TimeBox value={15} time={time} setTime={setTime} />
          <TimeBox value={30} time={time} setTime={setTime} />
          <TimeBox value={60} time={time} setTime={setTime} />
        </div>

        <div className="setup-buttons">
          <button onClick={startTest} setPage={()=>{setPage("test")}}>Start Test</button>

          <button  className="btn" onClick={() => setPage("home")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestSetup;
