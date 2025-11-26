const { useState, useEffect } = React;

function App() {
    const [form, setForm] = useState({
        name: "",
        sector: "",
        incomeRange: "",
        percentage: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (form.percentage === "") {
            setError("");
            return;
        }
        const num = parseFloat(form.percentage);
        if (isNaN(num)) setError("Enter a valid number");
        else if (num < 5) setError("Minimum 5%");
        else if (num > 50) setError("Maximum 50%");
        else setError("");
    }, [form.percentage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error || !form.name || !form.sector || !form.incomeRange || !form.percentage) {
            alert("Please fix errors and fill all fields");
            return;
        }

        try {
            const response = await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    sector: form.sector.trim(),
                    incomeRange: form.incomeRange.trim(),
                    perc: parseInt(form.percentage)
                })
            });

            if (response.ok) {
                const savedUser = await response.json();
                alert("Saved! Taking you to your profile...");

                window.location.href = `/profile.html?name=${encodeURIComponent(savedUser.name)}&sector=${encodeURIComponent(savedUser.sector)}&incomeRange=${encodeURIComponent(savedUser.incomeRange)}&perc=${encodeURIComponent(savedUser.perc)}`;
            } else {
                alert("Failed to save. Try again.");
            }
        } catch (err) {
            alert("Network error. Is backend running?");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            fontFamily: "Arial, sans-serif"
        }}>
            <form onSubmit={handleSubmit} style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                width: "100%",
                maxWidth: "500px"
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
                    Investment Profile
                </h2>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
                        1. What is your name?
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        required
                        style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
                        2. Your sector
                    </label>
                    <select
                        value={form.sector}
                        onChange={(e) => setForm({ ...form, sector: e.target.value })}
                        required
                        style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
                    >
                        <option value="">-- Please choose an option --</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Arts">Arts</option>
                        <option value="Business">Business</option>
                        <option value="Education">Education</option>
                        <option value="Government">Government</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="IT">IT</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Religion">Religion</option>
                        <option value="Services">Services</option>
                        <option value="Transport">Transport</option>
                        <option value="Self-employed">Self-employed</option>
                    </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
                        3. Your monthly income range (NGN)
                    </label>
                    <select
                        value={form.incomeRange}
                        onChange={(e) => setForm({ ...form, incomeRange: e.target.value })}
                        required
                        style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
                    >
                        <option value="">-- Please choose an option --</option>
                        <option value="<100k">below 100k</option>
                        <option value="100k-300k">100k - 300k</option>
                        <option value="300k-500k">300k - 500k</option>
                        <option value="500k-1M">500k - 1M</option>
                        <option value=">1M">over 1M</option>
                    </select>
                </div>

                <div style={{ marginBottom: "30px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
                        4. Max % of monthly salary to invest
                    </label>
                    <input
                        type="number"
                        value={form.percentage}
                        onChange={(e) => setForm({ ...form, percentage: e.target.value })}
                        placeholder="e.g. 20"
                        required
                        style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
                    />
                    {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "14px",
                        background: "#667eea",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                    onMouseOver={(e) => e.target.style.background = "#5a6fd8"}
                    onMouseOut={(e) => e.target.style.background = "#667eea"}
                >
                    Submit Profile
                </button>
            </form>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);