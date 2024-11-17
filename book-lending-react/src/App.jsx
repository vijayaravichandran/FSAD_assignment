
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Home from './components/Home';
import AddBookForm from './components/AddBook';
import EditBookForm from './components/EditBook';
import SearchBooks from './components/SearchBooks';
import Logout from './components/Logout';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/Layout';
import MainLayout from './components/MainLayout';



function App() {

  return (
    <Routes>
      {/* Route for Home page */}
      <Route path="/" element={<Layout />}>
        {/* UnProtected Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        {/* Protected Routes */}
        <Route path="add-book" element={<ProtectedRoute><AddBookForm /></ProtectedRoute>} />
        <Route path="edit-book/:bookId" element={<ProtectedRoute><EditBookForm /></ProtectedRoute>} />
        <Route path="search-books" element={<ProtectedRoute><SearchBooks /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App
