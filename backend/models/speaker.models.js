const mongoose = require('mongoose')

const SpeakerSchema = new mongoose.Schema({
    profileUrl: String,
    fullName: String,
    post: String,
})

const Speaker = mongoose.model('Speaker', SpeakerSchema)

module.exports = Speaker