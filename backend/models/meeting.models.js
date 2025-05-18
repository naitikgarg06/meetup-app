const mongoose = require('mongoose')
const MeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    hostedBy: {
        type: String,
    },
    dressCode: {
        type: String,
    },
    ageRestrictions: {
        type: String,
    },
    tags: [{
        type: String,
    }],
    sessionStartTime: {
        type: Date,
    },
    sessionEndTime: {
        type: Date,
    },
    address: {
        type : {
            venue: String,
            street: String,
            city: String,
        }
    }, 
    EventSpeakers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Speaker"
        }
    ]
}, {timestamps: true} )

const Meeting = mongoose.model('meetings', MeetingSchema)

module.exports = Meeting