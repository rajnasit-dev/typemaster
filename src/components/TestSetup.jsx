import TimeBox from "./TimeBox";
function TestSetup({ setPage, setTime, time }) {
  const startTest = () => {
    setTime(time);
    setPage("test");
  };
  return (
    <div className="page-container">
      <div className="content-card">
        <h2>⏱️ Select Duration</h2>
        <p style={{color: '#94a3b8', marginBottom: '8px'}}>Choose how long you want to practice:</p>
        <div className="selecttime">
          <TimeBox value={15} time={time} setTime={setTime} />
          <TimeBox value={30} time={time} setTime={setTime} />
          <TimeBox value={60} time={time} setTime={setTime} />
        </div>
        <div className="setup-buttons">
          <button onClick={startTest}>🎯 Start Test</button>
          <button className="btn" onClick={() => setPage("home")}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
export default TestSetup;
