import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            alert('Email and Password is required');
            return;
        }

        try {
            setIsSubmitting(true);

            const { email, password } = credentials;

            // Send POST request to backend API
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(apiUrl + '/login', {
                email,
                password,
            });

            // console.log(response);

            // Handle successful registration
            if (response.status === 200) {
                // alert('User login successful');
                const data = await response.data;
                login(data); // Call the login function in AuthProvider with { token, user }            

                // Optionally redirect or clear form
                setCredentials({
                    email: "",
                    password: ""
                });
                navigate('/dashboard/profile');
            }
        } catch (error) {
            alert('Login failed. Please try again.');
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Login...' : 'Login'}
            </button>
        </form>
    );
};

export default Login;
