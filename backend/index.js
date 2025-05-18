const express = require("express");
const cors = require('cors')
const { initialiseDatabase } = require("./db/db.connect");
const Speaker = require("./models/speaker.models")
const Meeting = require("./models/meeting.models");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
initialiseDatabase();


// read and get all meetings

async function readAllMeetings() {
  try {
    const meetings = await Meeting.find().populate('EventSpeakers');
    return meetings;
  } catch (error) {
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const allMeetings = await readAllMeetings();
    if (allMeetings.length != 0) {
      res.status(200).json(allMeetings);
    } else {
      res.status(404).json({ error: "No meeting found." });
    }
  } catch (error) {
    res.status(500).json("Failed to fetch meetings.");
  }
});

// get event by id

async function readEventById(id){
  try {
    const event = await Meeting.findById(id).populate("EventSpeakers")
    return event
  } catch (error) {
    throw error
  }
}

app.get("/events/:eventId", async (req, res) => {
  try {
    const event = await readEventById(req.params.eventId)
    if(event){
      res.status(200).json(event)
    } else {
      res.status(404).json({error: "Event not found"})
    }
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// listen request

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
