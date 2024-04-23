<<<<<<< HEAD
// const Db = process.env.MONGO_DB_KEY;
const Db = process.env.ATLAS_URI;



const mongoose = require("mongoose");
=======
const mongoose = require("mongoose");


const Db = process.env.ATLAS_URI;

>>>>>>> AliMashoud
//configure mongoose
mongoose.connect(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

dbConnection.on("error", (err) => {
  console.error("MongoDB Connection Error:", err);
});

dbConnection.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = dbConnection;