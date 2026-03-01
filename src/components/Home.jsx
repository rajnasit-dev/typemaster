
function Home({setPage}) {
  return (
    <div className="page-container">
      <div className="content-card">
        <h1>⌨️ TypeMaster</h1>
        <p>
            Practice your typing skills with our Keyboard Speed & Frequency trainer in real time. 
            Improve your typing speed, accuracy, and consistency with engaging exercises.
        </p>
        <div style={{marginTop: '30px', display: 'flex', gap: '15px', flexDirection: 'column'}}>
            <button onClick={() => setPage("practice")}>
                🚀 Start Practice
            </button>
            <button onClick={() => setPage("history")}>
                📊 View History
            </button>
        </div>
      </div>
    </div>
  )
}

export default Home