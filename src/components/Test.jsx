import React, { useState, useRef, useEffect } from "react";
import {paragraphs} from "../data/paragraphs.js";

function Test({time, setPage, setResult}) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const inputRef = useRef(null);
  const inputTextRef = useRef("");
  const startTimeRef = useRef(null);

  useEffect(() => {
    resetTest();
  }, []);

  const resetTest = () => {
    const size = time <= 15 ? "short" : time <= 30 ? "medium" : "long";
    const list = paragraphs[size];
    const random = list[Math.floor(Math.random() * list.length)];
    setText(random);
    setInput("");
    inputTextRef.current = "";
    setStartTime(null);
    startTimeRef.current = null;
    setEndTime(null);
    setTimer(time || 30);
    inputRef.current?.focus();
  };

  useEffect(() => {
    let interval;
    if (startTime && !endTime && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0 && !endTime) {
      calculateResult(startTimeRef.current, new Date(), inputTextRef.current);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime, timer]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    inputTextRef.current = val;
    if (!startTime && val.length > 0) {
      const now = new Date();
      setStartTime(now);
      startTimeRef.current = now;
    }
    if (val === text) {
      const end = new Date();
      setEndTime(end);
      calculateResult(startTimeRef.current, end, val);
    }
  };

  const calculateResult = (start, end, typedText) => {
    const timeTaken = (end - start) / 1000;
    const trimmed = typedText.trim();
    const wordsTyped = trimmed.length > 0 ? trimmed.split(/\s+/).length : 0;
    const speed = timeTaken > 0 ? Math.round((wordsTyped / timeTaken) * 60) : 0;
    const correctChars = typedText
      .split("")
      .filter((ch, i) => ch === text[i]).length;
    const accuracy = typedText.length > 0
      ? Math.round((correctChars / typedText.length) * 100)
      : 0;

    setResult({
      speed,
      accuracy,
      time: Math.round(timeTaken),
    });
    setPage("result");
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
    <div className="page-container">
      <div className="content-card" style={{maxWidth: '800px'}}>
        <h2>💻 Typing Test</h2>
        <div className="timer-display" style={{color: timer < 10 ? '#dc2626' : '#4f46e5'}}>
          ⏱️ {timer}s
        </div>

        <div className="paragraph-display">
          {getHighlightedText()}
        </div>

        <textarea
          ref={inputRef}
          className="test-input"
          placeholder="Start typing here..."
          value={input}
          onChange={handleChange}
          disabled={endTime || timer === 0}
        />
      </div>
    </div>
  );
}

export default Test;
