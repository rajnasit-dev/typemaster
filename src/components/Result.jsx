function Result({result, setPage}) {
  return (
    <div className="page-container">
      <div className="content-card" style={{maxWidth: '700px'}}>
        <h2>📊 Test Results</h2>
        {result ? (
          <div>
            <div className="result-grid">
              <div className="result-stat speed">
                <p className="result-stat-label">Speed</p>
                <h3 className="result-stat-value">{result.speed || 0} WPM</h3>
              </div>
              <div className="result-stat accuracy">
                <p className="result-stat-label">Accuracy</p>
                <h3 className="result-stat-value">{result.accuracy || 0}%</h3>
              </div>
              <div className="result-stat time">
                <p className="result-stat-label">Time</p>
                <h3 className="result-stat-value">{result.time}s</h3>
              </div>
            </div>

            <div className="setup-buttons">
              <button onClick={() => setPage("practice")} style={{flex: 1}}>🔄 Try Again</button>
              <button className="btn" onClick={() => setPage("home")} style={{flex: 1}}>🏠 Home</button>
            </div>
          </div>
        ) : (
          <p style={{textAlign: 'center', color: '#64748b', marginTop: '30px'}}>No results available. Take a test first!</p>
        )}
      </div>
    </div>
  );
}

export default Result;