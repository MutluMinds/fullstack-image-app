const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* Routes */
const giphyRouter = require("./routes/giphy");
const pixabayRouter = require("./routes/pixabay");

app.use("/giphy", giphyRouter);
app.use("/pixabay", pixabayRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
