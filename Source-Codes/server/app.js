const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
})

const port = 8000;

app.listen(port, () => {
    console.log(`Server running at Port ${port}`);
})