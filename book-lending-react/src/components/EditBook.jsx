import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// EditBookForm Component
const EditBookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [availability, setAvailability] = useState('available');

    const navigate = useNavigate();
    const { bookId } = useParams(); // This will get the bookId from the URL

    // Fetch existing book data when the component mounts or bookId changes
    useEffect(() => {
        const fetchBookDetails = async () => {
            const token = localStorage.getItem("authToken");
            const apiUrl = import.meta.env.VITE_API_URL;

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await axios.get(`${apiUrl}/books/${bookId}`, config);
            const { book } = response.data;

            setTitle(book.title || '');
            setAuthor(book.author || '');
            setGenre(book.genre || '');
            setCondition(book.condition || '');
            setAvailability(book.availability || 'available');
        };

        if (bookId) {
            fetchBookDetails();
        }
    }, [bookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBook = {
            title,
            author,
            genre,
            condition,
            availability,
        };

        const token = localStorage.getItem("authToken");
        const apiUrl = import.meta.env.VITE_API_URL;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // Send a PUT request to update the book
        await axios.put(`${apiUrl}/books/${bookId}`, updatedBook, config);

        // Reset form fields
        setTitle('');
        setAuthor('');
        setGenre('');
        setCondition('');
        setAvailability('available');

        alert('Book updated Successfully')
        navigate('/dashboard/profile');

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Book</h2>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Author:
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Genre:
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Condition:
                    <input
                        type="text"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Availability:
                    <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                    >
                        <option value="available">Available</option>
                        <option value="checked out">Checked Out</option>
                        <option value="reserved">Reserved</option>
                    </select>
                </label>
            </div>
            <button type="submit">Update Book</button>
        </form>
    );
};

export default EditBookForm;
