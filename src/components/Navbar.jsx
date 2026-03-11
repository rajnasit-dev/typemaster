function Navbar({ setPage, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo" onClick={() => setPage("home")}>⌨️ TypeMaster</span>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => setPage("home")}>Home</button>
          <button className="nav-btn" onClick={() => setPage("practice")}>Practice</button>
          <button className="nav-btn" onClick={() => setPage("history")}>History</button>
          {user && user.email ? (
            <>
              <span className="user-email">{user.email}</span>
              <button className="nav-btn" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="nav-btn" onClick={() => setPage("login")}>Login</button>
              <button className="nav-btn" onClick={() => setPage("register")}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
