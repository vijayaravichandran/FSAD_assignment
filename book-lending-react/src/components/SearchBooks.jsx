import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [location, setLocation] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const token = localStorage.getItem("authToken");
        const apiUrl = import.meta.env.VITE_API_URL;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                title,
                author,
                genre
            }
        };

        try {
            const response = await axios.get(`${apiUrl}/books/search`, config);
            setBooks(response.data);  // Set the books in the state
        } catch (err) {
            setError('Error retrieving books. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Search for Books</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                        />
                    </label>
                </div>
                <button type="submit">Search</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {books.length > 0 && (
                <div>
                    <h3>Search Results:</h3>
                    <ul>
                        {books.map((book) => (
                            <li key={book.id}>
                                <strong>{book.title}</strong> by {book.author} (Genre: {book.genre})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBooks;
