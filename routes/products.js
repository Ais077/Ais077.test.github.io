import express from "express";
import {nanoid} from "nanoid";
import * as path from 'path';
import multer from 'multer';
import config from "../config.js";
import Product from "../models/Product.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
})

const upload = multer({storage})

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'title description');
        res.send(products);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.sendStatus(404);
        }
        res.send(product);
    } catch (e) {
        res.sendStatus(500);
    }
})

router.post('/', upload.single('image'), async (req, res) => {
    const body = {...req.body};

    if(req.file) {
        body.image = req.file.filename;
    }

    const product = new Product(body);
    try {
        await product.save();
        res.send(product);
    } catch(e) {
        res.sendStatus(500);
    }


})



export default router;