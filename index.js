const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./utils/dbConnction");
const OrderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 4001;

//listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

//default route
app.get("/", (req, res) => {
  res.send("Ok from Server");
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//connect to database
connectDB();

app.use("/api/v1/admin", OrderRoutes);
