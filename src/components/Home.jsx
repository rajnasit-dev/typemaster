function Home({ setPage }) {
  return (
    <div className="page-container home-page">
      <div className="home-content">
        <h1 className="home-title">⌨️ TypeMaster</h1>
        <p className="home-subtitle">
          Practice your typing skills in real time. Improve your speed,
          accuracy, and consistency with engaging exercises.
        </p>
        <div className="home-features">
          <div className="feature-item">⚡ Speed Training</div>
          <div className="feature-item">🎯 Accuracy Tracking</div>
          <div className="feature-item">📈 Progress History</div>
        </div>
        <div className="home-actions">
          <button onClick={() => setPage("practice")}>🚀 Start Practice</button>
          <button className="btn" onClick={() => setPage("history")}>📊 View History</button>
        </div>
      </div>
    </div>
  );
}
export default Home;