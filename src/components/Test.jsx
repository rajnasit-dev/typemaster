import React, { useState, useRef, useEffect } from "react";
import {paragraphs} from "../data/paragraphs.js";

function Test({setPage, setResult}) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [result, setResultLocal] = useState(null);
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
    setTimer(30);
    inputRef.current?.focus();
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
    <div className="page-container">
      <div className="content-card" style={{maxWidth: '800px'}}>
        <h1 style={{fontSize: '24px', marginBottom: '20px'}}>💻 Typing Test</h1>
        <div style={{
          background: '#f0f9ff',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center',
          fontSize: '36px',
          fontWeight: 'bold',
          color: timer < 10 ? '#dc2626' : '#3b82f6'
        }}>
          ⏱️ {timer}s
        </div>

        <div style={{
          background: '#f9fafb',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          minHeight: '120px',
          lineHeight: '1.8',
          fontSize: '16px',
          color: '#374151',
          border: '1px solid #e5e7eb'
        }} className="paragraph">
          {getHighlightedText()}
        </div>

        <textarea
          ref={inputRef}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '15px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: '#ffffff',
            color: '#1f2937',
            fontSize: '15px',
            fontFamily: 'monospace',
            boxSizing: 'border-box',
            marginBottom: '20px'
          }}
          placeholder="Start typing here..."
          value={input}
          onChange={handleChange}
          disabled={result || timer === 0}
        />

        {result ? (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #d1fae5',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h2>✨ Test Complete!</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              margin: '20px 0'
            }}>
              <div>
                <p style={{color: '#6b7280'}}>Speed</p>
                <p style={{fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#1e40af'}}>{result.speed} WPM</p>
              </div>
              <div>
                <p style={{color: '#6b7280'}}>Accuracy</p>
                <p style={{fontSize: '24px', fontWeight: 'bold', margin: '0'}}>{result.accuracy}%</p>
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
              <button onClick={resetTest} style={{flex: 1}}>🔄 Try Again</button>
              <button className="btn" onClick={() => setPage("home")} style={{flex: 1}}>🏠 Home</button>
            </div>
          </div>
        ) : (
          <p style={{textAlign: 'center', color: '#6b7280', fontStyle: 'italic'}}>
            Start typing to begin the test...
          </p>
        )}
      </div>
    </div>
  );
}

export default Test;
