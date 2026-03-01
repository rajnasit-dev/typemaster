import React, { useEffect } from 'react'

function Result({result, setPage}) {
  return (
    <div className="page-container">
      <div className="content-card" style={{maxWidth: '700px'}}>
        <h2>📊 Test Results</h2>
        {result ? (
          <div style={{marginTop: '30px'}}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: '#eff6ff',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #bfdbfe',
                textAlign: 'center'
              }}>
                <p style={{color: '#6b7280', margin: '0 0 10px 0'}}>Speed</p>
                <h3 style={{margin: '0', fontSize: '28px', color: '#1e40af'}}>{result.speed || 0} WPM</h3>
              </div>
              <div style={{
                background: '#f0fdf4',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #d1fae5',
                textAlign: 'center'
              }}>
                <p style={{color: '#6b7280', margin: '0 0 10px 0'}}>Accuracy</p>
                <h3 style={{margin: '0', fontSize: '28px', color: '#059669'}}>{result.accuracy || 0}%</h3>
              </div>
            </div>

            <div style={{marginTop: '30px', display: 'flex', gap: '10px'}}>
              <button onClick={() => setPage("practice")} style={{flex: 1}}>🔄 Try Again</button>
              <button className="btn" onClick={() => setPage("home")} style={{flex: 1}}>🏠 Home</button>
            </div>
          </div>
        ) : (
          <p style={{textAlign: 'center', color: '#b0b0b0'}}>No results available</p>
        )}
      </div>
    </div>
  );
}

export default Result