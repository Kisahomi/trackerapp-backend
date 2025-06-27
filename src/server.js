import express from "express";
import {ENV} from "./config/env.js";
import {db} from "./config/db.js";
import { and, eq } from "drizzle-orm";
import {sessions, sessionDay, sessionWorkout} from "./db/schema.js";
import job from "./config/cron.js";

const app = express();
const PORT = ENV.PORT || 7001;

if(ENV.NODE_ENV === "production") job.start();

app.use(express.json())

app.get("/api/health", (req, res) => {
    res.status(200).json({success: true})
})



app.post("/api/sessions", async (req, res) => {

    try {
        const {name} = req.body; //same as saying  req.body.name
        
        if (!name){
            return res.status(400).json({error: "Missing required fields name from sessions"})

        }

        const newSession = await db.insert(sessions).values({
            name
        }).returning()

        res.status(201).json(newSession[0])

    } catch (error) {
        console.log("Error adding session", error)
        res.status(500).json({error:"Something went wrong in adding session"})
    }
})

app.post("/api/session-days", async (req, res) => {
    try {
      const { sessionId, daysOfWeek } = req.body; //same dapat sessionId sa id ng sessions table
  
      if (!sessionId || !daysOfWeek) {
        return res.status(400).json({ error: "Missing required fields: sessionId or daysOfWeek" });
      }
  
      const newSessionDay = await db.insert(sessionDay).values({
        sessionId,
        daysOfWeek
      }).returning();
  
      res.status(201).json(newSessionDay[0]);
    } catch (error) {
      console.log("Error adding session day/s", error);
      res.status(500).json({ error: "Something went wrong in adding session day" });
    }
});

app.post("/api/session-workouts", async (req, res) => {

  try {
    
    const { sessionId, workoutName, sets } = req.body;

    if (!sessionId || !workoutName || !sets) {
      res.status(400).json({error: "Missing required fields: sessionId, workoutName, sets"})
    }

    const newSessionWorkout = await db.insert(sessionWorkout).values({
      sessionId,
      workoutName,
      sets
    }).returning();

    res.status(201).json(newSessionWorkout[0])

  } catch (error) {
    console.log("Error adding session day", error);
      res.status(500).json({ error: "Something went wrong in adding session workout" });
  }
})

app.get("/api/session-workouts/allworkouts", async (req,res) => { //to get all session workouts and set
    
  try {
    const getSessionWorkouts = await db.select().from(sessionWorkout);
    res.status(200).json(getSessionWorkouts);

  } catch (error) {
    console.log("Error fetching session name: ", error)
    res.status(500).json({error: "Something went wrong with fetching all workouts"})
  }
})

app.get("/api/session-days/alldays", async (req,res) => { //to get all session days
    
  try {
    const getSessionDays = await db.select().from(sessionDay);
    res.status(200).json(getSessionDays);

  } catch (error) {
    console.log("Error fetching session name: ", error)
    res.status(500).json({error: "Something went wrong with fetching all days"})
  }
})

app.get("/api/sessions/allname", async (req,res) => { //to get all session name
    
  try {
    const getSessionName = await db.select().from(sessions);
    res.status(200).json(getSessionName);

  } catch (error) {
    console.log("Error fetching session name: ", error)
    res.status(500).json({error: "Something went wrong with fetching"})
  }
})

app.listen(PORT, () => {
    console.log("server is running on 6001", PORT);
})