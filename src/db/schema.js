import {pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const sessions = pgTable('sessions', {
    id: serial("id").primaryKey(),
    name: text("name").notNull()
});

export const sessionDay = pgTable('session_day', {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id").notNull().references(() => sessions.id),
    daysOfWeek: text("days_of_week").notNull()
})

export const sessionWorkout = pgTable('session_workout', {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id").notNull().references(() => sessions.id),
    workoutName: text("workout_name").notNull(),
    sets: integer("sets").notNull()
})

export const totalTime = pgTable('total_time', {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id").notNull().references(() => sessions.id),
    time: integer("time").notNull(),
    dateCreated: timestamp("date_created").defaultNow().notNull()
})