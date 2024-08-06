const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuzzleSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Sudoku', 'Crossword', 'Jigsaw', 'WordSearch'], required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    // image: { type: String }, 
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const Puzzle = mongoose.model('Puzzle',PuzzleSchema)

module.exports = Puzzle