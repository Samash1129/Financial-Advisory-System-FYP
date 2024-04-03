const { configDotenv } = require("dotenv");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors())

require("dotenv").config({ path: "./.env" });
// require('dotenv').config({ path: './.env' });

const port = process.env.PORT || 4500;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
})

console.log(process.env.MONGO_DB_KEY);

app.use("/api", require("./routes/user.routes"));
app.use("/api/pythonScripts", require("./routes/pythonScripts.routes"))
require("./db/conn");

app.get('/fetch-news', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5020/fetch-news');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(port, () => {
    console.log(`Server running at Port ${port}`);
})