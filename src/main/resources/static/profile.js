const { useState, useEffect } = React;

function ProfileApp() {
    const [userData, setUserData] = useState({ name: '', sector: '', incomeRange: '', perc: 0 });
    const [recommendationMessage, setRecommendationMessage] = useState("Loading recommendation...");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const sector = params.get('sector');
        const incomeRange = params.get('incomeRange');
        const perc = params.get('perc');

        setUserData({ name, sector, incomeRange, perc });

        fetch(`http://localhost:8080/api/recommendation?sector=${encodeURIComponent(sector)}&yourPercentage=${encodeURIComponent(perc)}`)
            .then(r => {
                if (!r.ok) {
                    throw new Error('Network response was not ok');
                }
                return r.json();
            })
            .then(data => {
                setRecommendationMessage(data.message);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
                setRecommendationMessage("Error loading recommendation.");
            });
    }, []);

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
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                width: '100%',
                maxWidth: '600px'
            }}>
                <h1>Welcome, {userData.name}!</h1>
                <p>Here is your saved profile information:</p>
                <ul>
                    <li><strong>Sector:</strong> {userData.sector}</li>
                    <li><strong>Income Range:</strong> {userData.incomeRange}</li>
                    <li><strong>Investment Percentage:</strong> {userData.perc}%</li>
                </ul>

                <h2>Recommendation:</h2>
                <div style={{ padding: '15px', background: '#f0f4ff', borderRadius: '8px', borderLeft: '5px solid #667eea' }}>
                    {isLoading ? <p>{recommendationMessage}</p> : <p>{recommendationMessage}</p>}
                    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                </div>

                <p style={{ marginTop: '20px' }}>
                    <a href="index.html" style={{ color: '#667eea', textDecoration: 'none' }}>
                        Go back to registration
                    </a>
                </p>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileApp />);