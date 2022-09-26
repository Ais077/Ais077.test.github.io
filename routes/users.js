import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async(req, res)=> {
    try {
        const user = new User(req.body);

        user.generateToken();

        await user.save();

        res.send(user);

    } catch (error) {

        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req,res)=>{
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send({error: 'User not find'});


    const isMatch = await user.checkPassword(req.body.password);
    if(!isMatch) return res.status(400).send({error: 'Password is wrong'});

    return res.send({message: 'Username and password correct!', user});
});

// router.post('/secret', (req,res)=> {
//     const token = req.get('Authorization');
//     if(!token) return res.status(401).send({error: "No token present"});

//     const user = await User.findOne({token});

//     if(!user) return res.status(401).send({error: "Wrong token"});

//     return res.send({message: 'secret word', username: user.username});
// })


export default router;