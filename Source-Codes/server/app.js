const express = require("express");

const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4500;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
})

app.use("/api", require("./routes/user.routes"));
require("./db/conn");


app.listen(port, () => {
    console.log(`Server running at Port ${port}`);
})