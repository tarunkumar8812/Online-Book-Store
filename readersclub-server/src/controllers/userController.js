const noteModel = require("../models/noteModel");


// ----------------------------- creating Note -----------------------------
const createNote = async (req, res) => {
    try {

        const result = await noteModel.create(req.body)

        if (!result) return res.status(404).json({ status: false, message: "data not found!!" })

        return res.status(201).json({ status: true, message: "Note created Successfully " })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

// ----------------------------- geting Notes -----------------------------
const getNotes = async (req, res) => {
    try {

        const result = await noteModel.find()

        if (result.length === 0) return res.status(404).json({ status: false, message: "data not found!!" })

        return res.status(200).json({ status: true, data: result })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

// ----------------------------- delete Note -----------------------------
const deleteNote = async (req, res) => {
    try {

        const result = await noteModel.deleteOne({ _id: req.query.id })

        return res.status(200).json({ status: true, message: "note deleted successfully" })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}
// ----------------------------- delete Note -----------------------------
const updateNote = async (req, res) => {
    try {

        const { id, title, text } = req.body

        const result = await noteModel.updateOne({ _id: id }, { $set: { title, text } }, { upsert: true })

        return res.status(200).json({ status: true, message: "note updated successfully" })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { createNote, getNotes, deleteNote, updateNote }