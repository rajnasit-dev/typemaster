import React, { useState, useRef, useEffect } from "react";
import {paragraphs} from "../data/paragraphs.js";

function Test() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [result, setResult] = useState(null);
  const [resultHistory, setResultHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    resetTest();
  }, []);

  const resetTest = () => {
    const random = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setText(random);
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setTimer(10);
    inputRef.current.focus();
  };

  useEffect(() => {
    let interval;
    if (startTime && !endTime && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0 && !result) {
      calculateResult(startTime, new Date(), true);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime, timer, result]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (!startTime && val.length > 0) {
      const now = new Date();
      setStartTime(now);
    }
    if (val === text) {
      const end = new Date();
      setEndTime(end);
      calculateResult(startTime, end);
    }
  };

  const calculateResult = (start, end) => {
    const timeTaken = (end - start) / 1000; // in seconds
    const wordsTyped = input.trim().split().length;
    const speed = Math.round((wordsTyped / timeTaken) * 60); // WPM
    const correctChars = input
      .split("")
      .filter((ch, i) => ch === text[i]).length;
    const accuracy = Math.round((correctChars / text.length) * 100);

    const res = {
      speed: speed,
      accuracy,
      time: timeTaken.toFixed(2),
    };
    setResult(res);
    setResultHistory((prev) => [res, ...prev]);
  };

  const getHighlightedText = () => {
    return text.split("").map((ch, i) => {
      let typedChar = input[i];
      let className = "";
      if (!typedChar) {
        className = "";
      } else if (typedChar === ch) {
        className = "correct";
      } else {
        className = "incorrect";
      }
      return (
        <span key={i} className={className}>
          {ch}
        </span>
      );
    });
  };

  return (
    <div className="">
      <h1>💻 Test by TypeMaster</h1>
      <p className="timer">Time Left: {timer}</p>
      <div className="box">
        <p className="paragraph">{getHighlightedText()}</p>
        <textarea
          ref={inputRef}
          className="input"
          placeholder="Start Typing here ..."
          value={input}
          onChange={handleChange}
          disabled={result || timer === 0}
        />
        {result ? (
          <div className="result">
            <p>Speed: {result.speed} WPM</p>
            <p>Accuracy: {result.accuracy}%</p>
            <p>Time Taken: {result.time} seconds</p>
            <button onClick={resetTest}>Try Again</button>
          </div>
        ) : (
          <p className="instruction">
            Type the above paragraph to test typing speed
          </p>
        )}
      </div>
      {resultHistory.length > 0 && (
        <div className="history">
          <h2>Test History</h2>
          <ul>
            {resultHistory.map((res, idx) => (
              <li key={idx}>
                <p>
                  <b>Speed:</b> {res.speed} WPM | <b>Accuracy:</b>{" "}
                  {res.accuracy}% | <b>Time:</b> {res.time}s
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Test;
