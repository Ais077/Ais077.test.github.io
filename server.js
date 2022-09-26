import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import products from './routes/products.js';
import categories from "./routes/categories.js";
import users from "./routes/users.js";
import user from './routes/user.js';
import trackHistory from './routes/trackHistory.js';

const app = express();
const PORT = 8000;


app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/products', products);
app.use('/categories', categories);
app.use('/users', users);


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