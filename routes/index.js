require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Puzzle = require('../model/Puzzle')
const PuzzlePiec = require('../model/PuzzlePiece')
var jwt = require('jsonwebtoken');
const Puzzlecontroller = require('../controller/PuzzleController')
const PuzzlePiececontroller = require('../controller/PuzzlePieceController')

/* GET home page. */
// Puzzle
router.post('/Puzzle',Puzzlecontroller.Puzzle_create );

router.get('/PuzzleData',Puzzlecontroller.Puzzle_sequre,Puzzlecontroller.Puzzle_get);

router.put('/PuzzleUpdate/:id',Puzzlecontroller.Puzzle_sequre,Puzzlecontroller.Puzzle_Update );

router.delete('/PuzzleDelete/:id',Puzzlecontroller.Puzzle_sequre,Puzzlecontroller.Puzzle_Delete );

// PuzzlePiece
router.post('/PuzzlePiece_create',PuzzlePiececontroller.PuzzlePiece_create);

router.get('/PuzzlePieceData',PuzzlePiececontroller.PuzzlePiece_sequre,PuzzlePiececontroller.PuzzlePiece_get);

router.put('/PuzzlePieceUpdate/:id',PuzzlePiececontroller.PuzzlePiece_sequre,PuzzlePiececontroller.PuzzlePiece_Update );

router.delete('/PuzzlePieceDelete/:id',PuzzlePiececontroller.PuzzlePiece_sequre,PuzzlePiececontroller.PuzzlePiece_Delete);

module.exports = router;
