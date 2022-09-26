import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get('/', async (req, res) => {
   try {
       const categories = await Category.find();
       res.send(categories);
   } catch {
       res.sendStatus(500);
   }
});

router.post('/', async (req, res) => {
    const categoryData = {
        title: req.body.title,
        description: req.body.description
    }
    const category = new Category(categoryData);

    try {
        await category.save();
        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
})

export default router;