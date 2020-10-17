const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const gifsRouter = require('./routes/gifs');
const imagesRouter = require('./routes/images');

app.use('/gifs', gifsRouter);
app.use('/images', imagesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
