import { Link } from "react-router-dom";

const CustomerHome = () => {
    return (
        <div className="page-content center-content" style={{ textAlign: 'center', marginTop: '10%' }}>
            <h1>Welcome to our Digital Menu</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>Please select how you would like to view our delicious offerings.</p>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                <Link to="/customer_menu_table" style={{
                    padding: '2rem 3rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'transform 0.3s'
                }}>
                    <span style={{ fontSize: '3rem' }}>📄</span>
                    <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Table View</span>
                    <span style={{ color: '#888' }}>Best for comparing prices</span>
                </Link>

                <Link to="/customer_menu_gallery" style={{
                    padding: '2rem 3rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'transform 0.3s'
                }}>
                    <span style={{ fontSize: '3rem' }}>🖼️</span>
                    <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Gallery View</span>
                    <span style={{ color: '#888' }}>Rich visual experience</span>
                </Link>
            </div>
        </div>
    );
};

export default CustomerHome;
