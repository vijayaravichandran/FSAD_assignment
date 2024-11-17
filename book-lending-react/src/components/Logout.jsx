import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';

const Logout = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const logOut = async () => {
            logout();
            navigate("/"); // Redirect to home or login page after logout
        };

        logOut();
    }, []); // Empty dependency array means this effect runs once when the component mounts


    return (
        <div>Logout</div>
    )
}

export default Logout