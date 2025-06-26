import express from "express";
import {ENV} from "./config/env.js";
import {db} from "./config/db.js";
import { and, eq } from "drizzle-orm";
import {sessions, sessionDay} from "./db/schema.js";
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
        const {name} = req.body;
        
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

app.post("/api/session-day", async (req, res) => {
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
      console.log("Error adding session day", error);
      res.status(500).json({ error: "Something went wrong in adding session day" });
    }
});

app.get("/api/sessions/allname", async (req,res) => {
    
  try {
   

    const sessionName = await db.select().from(sessions);
    res.status(200).json(sessionName);

  } catch (error) {
    console.log("Error fetching session name: ", error)
    res.status(500).json({error: "Something went wrong with fetching"})
  }
})

app.listen(PORT, () => {
    console.log("server is running on 6001", PORT);
})