import { Outlet, Link } from 'react-router-dom';
import '../assets/styles/mainlayout.css';

const MainLayout = () => {
    return (
        <div className="layout">
            <nav className="sidebar">
                <ul>
                    <li><Link to="/dashboard/add-book">Add Book</Link></li>
                    <li><Link to="/dashboard/search-books">Search Books</Link></li>
                    <li><Link to="/dashboard/profile">Profile</Link></li>
                    <li><Link to="/dashboard/logout">Logout</Link></li>
                </ul>
            </nav>
            <div className="content">
                <Outlet /> {/* This is where the child routes will render */}
            </div>
        </div>
    );
};

export default MainLayout;
