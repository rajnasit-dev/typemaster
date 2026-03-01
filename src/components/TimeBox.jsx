function TimeBox({ value, time, setTime }) {
  return (
    <div
      className="timebox"
      onClick={() => setTime(value)}
      style={{
        ...(time === value && { fontWeight: "bold" }),
      }}
    >
      {value}s
    </div>
  );
}

export default TimeBox;
