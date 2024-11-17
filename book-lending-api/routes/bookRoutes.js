const Router = require("koa-router");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = new Router();
const SECRET_KEY = process.env.SECRET_KEY;

const getUid = (token) => {
  const decoded = jwt.verify(token, SECRET_KEY);
  var userId = decoded.uid;
  return userId;
};

// Add Book
router.post("/addbook", async (ctx) => {
  const { id, title, author, genre, condition, availability } =
    ctx.request.body;

  const token = ctx.headers.authorization.split(" ")[1];
  const user_id = getUid(token);

  if (!title || !author || !genre || !condition || !availability) {
    ctx.status = 400;
    ctx.body = {
      message: "Please provide title, author, genre, condition, availability.",
    };
    return;
  }

  // Check if the Book already exists
  const existingBook = await db("books").where({ title }).first();

  if (existingBook) {
    ctx.status = 400;
    ctx.body = { message: "Book with title already exists." };
    return;
  }

  // Create new Book
  await db("books").insert({
    id,
    user_id,
    title,
    author,
    genre,
    condition,
    availability,
  });

  ctx.status = 201;
  ctx.body = { message: "Book added successfully" };
});

// Route to search for books
router.get("/books/search", async (ctx) => {
  const { title, author, genre } = ctx.query; // Get search criteria from query parameters

  // Build the query dynamically based on provided parameters
  const query = db("books");

  if (title) {
    query.where("title", "like", `%${title}%`); // Use LIKE for partial matches
  }
  if (author) {
    query.where("author", "like", `%${author}%`);
  }
  if (genre) {
    query.where("genre", "like", `%${genre}%`);
  }

  try {
    const books = await query; // Execute the query
    ctx.status = 200;
    ctx.body = books; // Return the found books
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error retrieving books", error: error.message };
  }
});

// Get Books
router.get("/books", async (ctx) => {
  const token = ctx.headers.authorization.split(" ")[1];
  const user_id = getUid(token);

  // Check if the Book already exists
  const books = await db("books").where({ user_id });

  if (!books) {
    ctx.status = 404;
    ctx.body = { message: "No Books Found" };
    return;
  }

  ctx.status = 201;
  ctx.body = { books };
});

// Get Book based on Id
router.get("/books/:id", async (ctx) => {
  const bookId = ctx.params.id;

  // Check if the Book already exists
  const book = await db("books").where({ id: bookId }).first();

  if (!book) {
    ctx.status = 404;
    ctx.body = { message: "No Book Found" };
    return;
  }

  ctx.status = 201;
  ctx.body = { book };
});

// Route to edit a book
router.put("/books/:id", async (ctx) => {
  const bookId = ctx.params.id;
  const { title, author, genre, condition, availability } = ctx.request.body;

  // Validate the incoming data
  if (!title || !author || !genre || !condition || !availability) {
    ctx.status = 400;
    ctx.body = { message: "All fields are required" };
    return;
  }

  try {
    const result = await db("books").where({ id: bookId }).update({
      title,
      author,
      genre,
      condition,
      availability,
    });

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "Book updated successfully" };
    } else {
      ctx.status = 404;
      ctx.body = { message: "Book not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error updating book", error: error.message };
  }
});

// Route to delete a book
router.delete("/books/:id", async (ctx) => {
  const bookId = ctx.params.id;

  try {
    const result = await knex("books").where({ id: bookId }).del(); // Delete the book

    if (result) {
      ctx.status = 200;
      ctx.body = { message: "Book deleted successfully" };
    } else {
      ctx.status = 404;
      ctx.body = { message: "Book not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error deleting book", error: error.message };
  }
});

module.exports = router;
