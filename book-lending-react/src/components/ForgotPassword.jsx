import { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forgot password logic here
        alert('Reset link sent to:' + email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Send Reset Link</button>
        </form>
    );
};

export default ForgotPassword;
