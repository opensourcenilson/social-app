const express = require("express");
const connect = require("./configs/db/db");
const authenticateToken = require("./middleware/jwt_verify");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use("/api/v1", require("./routes/user.router"));
app.use("/posts", authenticateToken, require("./routes/posts.router"));
app.get("/", authenticateToken,(req, res) => {
    res.status(200).json({success: true, message: "Welcome to the API"});
});
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
