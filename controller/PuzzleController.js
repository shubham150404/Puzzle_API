require('dotenv').config();
const mongoose = require('mongoose');
const Puzzle = require('../model/Puzzle')
var jwt = require('jsonwebtoken');


exports.Puzzle_create = async function (req, res, next) {
    try {
      if (!req.body.title || !req.body.type || !req.body.difficulty || !req.body.description) {
        throw new Error("Please the data")
      }
      if (!req.body.createdAt) {
        req.body.createdAt = Date.now()
      }
      if (!req.body.updatedAt) {
        req.body.updatedAt = Date.now()
      }
      const validPuzzleTypes = ['Sudoku', 'Crossword', 'Jigsaw', 'WordSearch'];
      if (!validPuzzleTypes.includes(req.body.type)) {
        throw new Error("Puzzle type must be 'Sudoku', 'Crossword', 'Jigsaw', or 'WordSearch'");
      }
      const Puzzle_data = await Puzzle.create(req.body)
    //   console.table(Puzzle_data);
      const Jwt_Puzzle = jwt.sign({ id: Puzzle_data._id }, process.env.SECRET_PUZZLE)
      res.status(201).json({
        status: "sucess",
        message: "Puzzle create",
        data: Puzzle_data,
        Jwt_Puzzle
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message,
      })
    }
  }

exports.Puzzle_get = async function (req, res, next) {
    try {
      const Puzzle_get = await Puzzle.find()
      
      res.status(201).json({
        status: "sucess",
        message: "Puzzle Find",
        data: Puzzle_get,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message,
      })
    }
  } 

exports.Puzzle_Update = async function (req, res, next) {
    try {
      id = req.params.id
      if (req.body.updatedAt) {
        req.body.updatedAt = Date.now()
      } else if (!req.body.updatedAt) {
        req.body.updatedAt = Date.now()
      }
      const Puzzle_get = await Puzzle.findByIdAndUpdate(id, req.body)
      console.log(Puzzle_get);
      res.status(201).json({
        status: "sucess",
        message: "Puzzle Update",
        data: Puzzle_get,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: "Puzzle not Update",
      })
    }
  }



exports.Puzzle_Delete = async function (req, res, next) {
    try {
      id = req.params.id
      await Puzzle.findByIdAndDelete(id)
      res.status(201).json({
        status: "sucess",
        message: "Puzzle Delete",
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: "Puzzle not delete",
      })
    }
  }

exports.Puzzle_sequre = async function (req, res, next) {
    try {
        let Puzzle_Token = req.headers.authorization
        if (!Puzzle_Token) {
            throw new Error("TOken not found")
        }
        const Jwt_token = jwt.verify(Puzzle_Token, process.env.SECRET_PUZZLE);
        console.table(Jwt_token)
        next()
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: "PuzzlePiece is not sequre",
        })
    }
}