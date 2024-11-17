const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("../db");

const router = new Router();
const SECRET_KEY = process.env.SECRET_KEY;

// Register
router.post("/register", async (ctx) => {
  const { name, email, password } = ctx.request.body;

  if (!name || !email || !password) {
    ctx.status = 400;
    ctx.body = { message: "Please provide name, email and password." };
    return;
  }

  // Check if the email already exists
  const existingEmail = await db("users").where({ email }).first();

  if (existingEmail) {
    ctx.status = 400;
    ctx.body = { message: "Email already exists." };
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  await db("users").insert({
    name,
    email,
    passwordhash: hashedPassword,
  });

  ctx.status = 201;
  ctx.body = { message: "User registered successfully" };
});

//Login
router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { message: "Please enter email and password." };
    return;
  }

  // Find user by email
  const userRecord = await db("users").where({ email }).first();

  if (!userRecord) {
    ctx.status = 401;
    ctx.body = { message: "Invalid email or password." };
    return;
  }

  // Check password with hashed Password
  const isPwdValid = await bcrypt.compare(password, userRecord.passwordhash);

  if (!isPwdValid) {
    ctx.status = 401;
    ctx.body = { message: "Invalid email or password." };
    return;
  }

  // Generate JWT token
  const token = jwt.sign({ uid: userRecord.id }, SECRET_KEY, {
    expiresIn: "3h",
  });
  // console.log(token);

  ctx.status = 200;
  const user = {
    id: userRecord.id,
    email: userRecord.email,
    name: userRecord.name,
  };
  ctx.body = { token, user };
});

//Forgot Password
router.post("/forgotpassword", async (ctx) => {
  const { email } = ctx.request.body;

  if (!email) {
    ctx.status = 400;
    ctx.body = { message: "Please provide your email." };
    return;
  }

  // Find user by email
  const user = await db("users").where({ email }).first();

  if (!user) {
    ctx.status = 404;
    ctx.body = { message: "User not found." };
    return;
  }

  // Here, we would generate a password reset token and send it via email
  // For simplicity, we'll just generate a fake token
  const resetToken = Date.now();

  // You would send this token to the user’s email address in a real application
  ctx.status = 200;
  ctx.body = { message: "Password reset email sent", resetToken };
});

// Protected route to get the user profile
router.post("/profile", async (ctx) => {
  // The user information can be accessed from ctx.state.user
  // console.log(ctx.state);
  ctx.body = {
    message: "Profile retrieved successfully",
    user: ctx.state.user,
  };
});

module.exports = router;
