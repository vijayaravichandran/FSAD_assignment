const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const jwt = require("koa-jwt");
const cors = require("@koa/cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();
const app = new Koa();

// Middleware
app.use(bodyParser());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY;
const authMiddleware = jwt({ secret: SECRET_KEY }).unless({
  path: [/^\/register/, /^\/login/, /^\/forgot-password/], // Public routes
});
app.use(authMiddleware);

// Set up routes
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

app.use(bookRoutes.routes());
app.use(bookRoutes.allowedMethods());

const port = process.env.PORT || 3000;

try {
  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
} catch (error) {
  console.error("Error starting Server", error);
}
