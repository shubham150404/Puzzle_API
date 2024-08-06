const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuzzlePieceSchema = new Schema({
    puzzle: { type: mongoose.Schema.Types.ObjectId, ref: 'Puzzle' },
    pieceNumber: { type: Number, required: true },
    // image: { type: String }, // URL or path to the puzzle piece image
    position: { type: { x: Number, y: Number }, required: true },
    rotation: { type: Number, default: 0 } // Rotation angle of the puzzle piece (in degrees)
  });


const PuzzlePiece = mongoose.model('PuzzlePiece',PuzzlePieceSchema)

module.exports = PuzzlePiece