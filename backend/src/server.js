require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

console.log(process.env.MONGO_URI);