import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    googleId:    { type: String },
    title:       { type: String, required: true },
    author:      { type: String, required: true },
    cover:       { type: String },
    description: { type: String },
    rating:      { type: Number, min: 1, max: 5, default: null },
    isbn:        { type: String },
    status:      { type: String, enum: ['none', 'reading', 'done', 'trash'], default: 'none' }
}, { timestamps: true })

export default mongoose.model('Book', BookSchema)