// import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

const Profile = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(apiUrl + '/books', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }

                const data = await response.json();
                setBooks(data.books);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []); // Empty dependency array means this effect runs once when the component mounts



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div>
            <h1>My Book List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author} ({book.genre}) - {book.condition} - {book.availability}
                        &nbsp;&nbsp;<Link to={`/dashboard/edit-book/${book.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );



    return (
        <div>Profile</div>
    )
}

export default Profile