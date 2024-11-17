import { Outlet, Link } from 'react-router-dom';
import '../assets/styles/layout.css'; // Import the layout CSS file

const Layout = ({ children }) => {
    return (

        <div className="layout-container">
            <header className="layout-header">
                <h1>Library Home Page</h1>
                <h2>Book exchange and sharing application</h2>
                <h3>SAVE PAPER save plants go digital</h3>
                <nav>
                    <ul>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/forgot-password">Forgot Password</Link></li>
                    </ul>
                </nav>
            </header>

            <main className="layout-main">
                <Outlet /> {/* This is where the child routes will render */}

            </main>

            <footer className="layout-footer">
                <p>&copy; 2024 Book Sharing App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
