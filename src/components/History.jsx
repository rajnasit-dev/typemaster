import React from 'react'

function History({ setPage, history }) {

  return (
    <div className="page-container">
      <div className="content-card" style={{maxWidth: '900px'}}>
        <h2>📈 Practice History</h2>
        {history.length > 0 ? (
          <>
            <table>
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
            <div className="setup-buttons" style={{marginTop: '24px'}}>
              <button onClick={() => setPage("practice")} style={{flex: 1}}>🚀 Practice More</button>
              <button className="btn" onClick={() => setPage("home")} style={{flex: 1}}>🏠 Back Home</button>
            </div>
          </>
        ) : (
          <>
            <p style={{textAlign: 'center', color: '#94a3b8', marginTop: '30px', lineHeight: '1.6'}}>
              No test history yet. Start practicing to see your results here!
            </p>
            <div className="setup-buttons" style={{marginTop: '24px'}}>
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