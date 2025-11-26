const { useState, useEffect } = React;

const ADMIN_PASSWORD = "0000"; 

function AdminApp() {
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            fetch("/api/users")
                .then(r => r.json())
                .then(setUsers)
                .catch(() => alert("Error loading data"));
        } [loggedIn]});

    const login = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) setLoggedIn(true);
        else alert("Wrong password");
    };

    if (!loggedIn) {
        return (
            <div>
                <h2>Admin Access Required</h2>
                <form onSubmit={login}>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                        autoFocus
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <p><strong>{users.length}</strong> total submissions</p>
            {users.length === 0 ? <p>No data yet.</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sector</th>
                            <th>Income Range</th>
                            <th>Aggressiveness %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td><strong>{u.name}</strong></td>
                                <td>{u.sector}</td>
                                <td>{u.incomeRange}</td>
                                <td style={{ fontWeight: "bold", color: u.perc > 30 ? "#ff4444" : "#44ff44" }}>
                                    {u.perc}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <p style={{ marginTop: "40px" }}><a href="/" style={{ color: "#0f0" }}>Back to public site</a></p>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AdminApp />);