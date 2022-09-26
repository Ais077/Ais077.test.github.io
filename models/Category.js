import mongoose from "mongoose";

const CategoryScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String
});

const Category = mongoose.model('Category', CategoryScheme);

export default Category;