import express from "express";
import {nanoid} from "nanoid";
import * as path from 'path';
import multer from 'multer';
import config from "../config.js";
import Album from "../models/Album.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});
const router = express.Router();

router.get('/:id?', async (req, res) => {
    if(req.query.artist) {
        try {
            const albums = await Album.find({artist: req.query.artist}).sort([['year', 1]]).populate('artist');
            res.send(albums);
        } catch (error) {
            res.sendStatus(404);
        };
    } else if(req.params.id) {
        try {
            const albums = await Album.findById(req.params.id).populate('artist');
            res.send(albums);
        } catch (error) {
            res.sendStatus(404);
        };
    } else {
        try {
            const albums = await Album.find().populate('artist');
            res.send(albums);
        } catch (e) {
            res.sendStatus(500);
        };
    };
});

router.post('/', upload.single('image'), async (req, res) => {  
    const body = {...req.body};
    if(req.file) body.image = req.file.filename;

    const album = new Album(body);
    try {
        await album.save();
        res.send(album);
    } catch(e) {
        res.sendStatus(500);
    };
});



export default router;