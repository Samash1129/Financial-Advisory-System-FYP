const express = require("express");

const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
})

app.use("/api", require("./routes/user.routes"));
require("./db/conn");

// Handling 404 error (page not found)
app.use((req, res) => {
    res.status(404).send("404 error");
});

app.listen(port, () => {
    console.log(`Server running at Port ${port}`);
})