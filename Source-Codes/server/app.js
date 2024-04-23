const { configDotenv } = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config({ path: "./.env" });
require("./db/conn");

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  exposedHeaders: ['Authorization'], // Headers exposed to the client
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: "None", secure: true, httpOnly: true },
  })
);

<<<<<<< HEAD
require("dotenv").config({ path: "./.env" });
// require('dotenv').config({ path: './.env' });

=======
>>>>>>> AliMashoud
const port = process.env.PORT || 4500;

app.use(express.json());

app.get("/", (req, res) => {
<<<<<<< HEAD
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


=======
  res.send("Welcome");
});

app.use("/api", require("./Routes/user.routes"));
app.use("/api/pythonScripts", require("./Routes/pythonScripts.routes"));
>>>>>>> AliMashoud

app.listen(port, () => {
  console.log(`Server running at Port ${port}!`);
});
