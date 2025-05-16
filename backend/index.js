const express = require("express");
const cors = require('cors')

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const { initialiseDatabase } = require("./db/db.connect");
const Meeting = require("./models/meeting.models");

app.use(express.json());
initialiseDatabase();

const createMeeting = async (data) => {
  try {
    const newMeeting = new Meeting(data);
    const savedMeeting = await newMeeting.save();
    return savedMeeting;
  } catch (error) {
    throw error;
  }
};

// createMeeting(meeting1)

// read and get all meetings

async function readAllMeetings() {
  try {
    const meetings = await Meeting.find();
    return meetings;
  } catch (error) {
    throw error;
  }
}

app.get("/meetings", async (req, res) => {
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

// listen request

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
