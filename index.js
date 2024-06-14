// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/.env" });
}

// Import required modules
const cloudinary = require("cloudinary");
const expressFileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/connection");
const userRoutes = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");

// Set up middlewares
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(expressFileUpload());

// Set up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

// Connect to the database
connectDB();

// Set up routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "./build21")));

// Catch-all route for frontend
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build21/index.html"));
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server Running At http://localhost:${port}`);
});
