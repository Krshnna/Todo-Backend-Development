const app = require("./app");
const { connectDatabase } = require("./config/database");
connectDatabase();

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})