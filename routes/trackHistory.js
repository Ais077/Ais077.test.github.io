import express from 'express';
import User from '../models/User.js';
import TrackHistory from '../models/TrackHistory.js';

const router = express.Router();

router.post('/secret', async (req,res)=> {
    const token = req.get('Authorization');
    if(!token) return res.status(401).send({error: "No token present"});

    const user = await User.findOne({token});

    if(!user) return res.status(401).send({error: "Wrong token"});

    const body = {...req.body, user: user};
    const history = new TrackHistory(body);

    try {
        await history.save();
    
        res.send(body);
    } catch(error) {
        res.sendStatus(401).send({error: 'Unauthorized'});
    };
})

export default router;