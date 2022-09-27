import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import products from './routes/track.js';
import categories from "./routes/album.js";
import users from './routes/users.js';
import trackHistory from './routes/trackHistory.js';
import track from './routes/track.js';

const app = express();
const PORT = 8000;


app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/artist', products);
app.use('/albums', categories);
app.use('/track', track);
app.use('/user', users);
app.use('/trackHistories', trackHistory);


const run = async() => {
    mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true});


    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    })

    process.on("exit", () => {
        mongoose.disconnect();
    })
}

run().catch(console.error);