const Db = "mongodb+srv://dev:CITsI6uEkchPWJmV@elev8.rzawmjq.mongodb.net/";



const mongoose = require("mongoose");
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