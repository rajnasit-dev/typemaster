import React, { useState, useEffect } from 'react'

function History({ setPage }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage or state
    const savedHistory = localStorage.getItem('typingHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="page-container">
      <div className="content-card" style={{maxWidth: '900px'}}>
        <h2>📈 Practice History</h2>
        {history.length > 0 ? (
          <>
            <table style={{marginTop: '20px'}}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Speed (WPM)</th>
                  <th>Accuracy (%)</th>
                  <th>Duration (s)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.speed || 0}</td>
                    <td>{item.accuracy || 0}</td>
                    <td>{item.duration || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop: '30px', display: 'flex', gap: '10px'}}>
              <button onClick={() => setPage("home")} style={{flex: 1}}>🏠 Back Home</button>
            </div>
          </>
        ) : (
          <>
            <p style={{textAlign: 'center', color: '#6b7280', marginTop: '30px'}}>
              No test history yet. Start practicing to see your results here!
            </p>
            <div style={{marginTop: '30px', display: 'flex', gap: '10px'}}>
              <button onClick={() => setPage("practice")} style={{flex: 1}}>🚀 Start Practicing</button>
              <button className="btn" onClick={() => setPage("home")} style={{flex: 1}}>🏠 Back Home</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default History