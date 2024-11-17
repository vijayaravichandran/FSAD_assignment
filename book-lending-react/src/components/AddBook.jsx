import { useState } from 'react';
import axios from 'axios';

// Sample function to generate a unique ID for each book
const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const AddBookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [availability, setAvailability] = useState('available'); // default to available

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            id: generateUniqueId(),
            title,
            author,
            genre,
            condition,
            availability,
        };

        const token = localStorage.getItem("authToken");
        const apiUrl = import.meta.env.VITE_API_URL;

        // Include the token in the request header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post(apiUrl + '/addbook', newBook, config);

        // Reset form fields
        setTitle('');
        setAuthor('');
        setGenre('');
        setCondition('');
        setAvailability('available');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Book</h2>
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
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBookForm;
