import express from "express";
import Track from "../models/Track.js";
import Album from "../models/Album.js";

const router = express.Router();

router.get('/', async (req, res) => {
    if(req.query.album){
        const album = await Track.find({album: req.query.album});
        return res.send(album);
    };

    if(req.query.artist){
        const album = await Album.find({artistName: req.query.artist});
        const trackArtist = await Track.find({albumName: album});
        return res.send(trackArtist);
    };

    try{
        const track = await Track.find().sort([['counter', 1]]).populate('album','_id name artist year');

        res.send(track);

        if(!track) res.sendStatus(404);
    }catch(e){
        res.sendStatus(401);
    };
});

router.post('/', async (req, res) => {  
    const body = {...req.body};

    const track = new Track(body);
    try {
        
        await track.save();
        res.send(track);
    } catch(e) {
        res.sendStatus(500);
    };
});



export default router;