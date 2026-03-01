
function Home({setPage}) {
  return (
    <div>
        <h1>Keyboard Speed & Frequency Trainer</h1>
        <p>
            Practice your typing skills with our Keyboard Speed & Frequency in real time.
        </p>
        <div>
            <button onClick={() => setPage("practice")}>
                Start Practice
            </button>
            <button onClick={() => setPage("history")}>
                View History
            </button>
        </div>
    </div>
  )
}

export default Home