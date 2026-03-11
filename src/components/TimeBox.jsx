function TimeBox({ value, time, setTime }) {
  return (
    <div
      className={`timebox ${time === value ? "active" : ""}`}
      onClick={() => setTime(value)}
    >
      {value}s
    </div>
  );
}
export default TimeBox;
