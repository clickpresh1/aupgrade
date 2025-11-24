const { useState, useEffect } = React;

function App() {
    const [name, setName] = useState("");
    const [sector, setSector] = useState("");
    const [incomeRange, setIncomeRange] = useState("");
    const [percentage, setPercentage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (percentage === "") {
            setError("");
            return;
        }

        const num = parseFloat(percentage);
        if (isNaN(num)) {
            setError("Enter a valid number");
        } else if (num < 5) {
            setError("Invalid: Minimum 5%");
        } else if (num > 50) {
            setError("Invalid: Maximum 50%");
        } else {
            setError("");
        }
    }, [percentage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error || !name || !sector || !percentage) {
            alert("Please fix errors and fill all fields");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    sector: sector.trim(),
                    incomeRange: incomeRange.trim(),
                    percentage: parseInt(percentage)
                })
            });

            if (response.ok) {
                alert("Saved! Taking you to your recommendation...");
                window.location.href =
                    `/recommendation.html?name=${encodeURIComponent(name)}&sector=${encodeURIComponent(sector)}&incomeRange=${encodeURIComponent(incomeRange)}&pct=${percentage}`;
            } else {
                alert("Failed to save. Try again.");
            }
        } catch (err) {
            alert("Network error. Is backend running on port 8080?");
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <form onSubmit={handleSubmit} style={{
                background: 'white',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                width: '100%',
                maxWidth: '500px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
                    Investment Profile
                </h2>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                        1. What is your name?
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                        2. Your sector
                    </label>

                    <div><select id="myDropdown" name="selectedOption" value={sector} onChange={(e) => setSector(e.target.value)} required>
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
                    </select></div>

                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                        3. Max % of monthly salary to invest
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        placeholder="e.g. 20"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <button type="submit" style={{
                    width: '100%',
                    padding: '14px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                }}
                    onMouseOver={(e) => e.target.style.background = '#5a6fd8'}
                    onMouseOut={(e) => e.target.style.background = '#667eea'}
                >
                    Submit Profile
                </button>
            </form>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);