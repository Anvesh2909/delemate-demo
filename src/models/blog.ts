import mongoose from 'mongoose';

const ParagraphSchema = new mongoose.Schema({
    heading: String,
    paragraph: String,
}, { _id: false });

const BlogSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    link: String, // Image URL
    date: String, // or Date if you prefer
    min: Number,
    text: [ParagraphSchema]
}, { timestamps: true });

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);