require('dotenv').config();
const mongoose = require('mongoose');
const PuzzlePiec = require('../model/PuzzlePiece')
var jwt = require('jsonwebtoken');


exports.PuzzlePiece_create = async function (req, res, next) {
    try {
        if (!req.body.puzzle || !req.body.pieceNumber || !req.body.position || !req.body.rotation) {
            throw new Error("Please the data")
        }
        const PuzzlePiece_data = await PuzzlePiec.create(req.body)
        const Jwt_PuzzlePiece = jwt.sign({ id: PuzzlePiece_data._id }, process.env.SECRET_PUZZLEPIECE)
        res.status(201).json({
            status: "sucess",
            message: "Puzzle create",
            data: PuzzlePiece_data,
            Jwt_PuzzlePiece
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.PuzzlePiece_get = async function (req, res, next) {
    try {
        const PuzzlePiece_get = await PuzzlePiec.find()
        res.status(201).json({
            status: "sucess",
            message: "Puzzle Find",
            data: PuzzlePiece_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.PuzzlePiece_Update = async function (req, res, next) {
    try {
        id = req.params.id
        if (req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        } else if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const PuzzlePiece_get = await PuzzlePiec.findByIdAndUpdate(id, req.body)
        console.log(Puzzle_get);
        res.status(201).json({
            status: "sucess",
            message: "PuzzlePiece Update",
            data: PuzzlePiece_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.PuzzlePiece_Delete = async function (req, res, next) {
    try {
        id = req.params.id
        await PuzzlePiec.findByIdAndDelete(id)
        res.status(201).json({
            status: "sucess",
            message: "PuzzlePiece Delete",
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.PuzzlePiece_sequre = async function (req, res, next) {
    try {
        let PuzzlePiece_Token = req.headers.authorization
        if (!PuzzlePiece_Token) {
            throw new Error("TOken not found")
        }
        const Jwt_token = jwt.verify(PuzzlePiece_Token, process.env.SECRET_PUZZLEPIECE);
        next()
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: "PuzzlePiece is not sequre",
        })
    }
}