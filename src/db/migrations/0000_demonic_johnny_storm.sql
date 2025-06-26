CREATE TABLE "session_day" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"days_of_week" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_workout" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"workout_name" text NOT NULL,
	"sets" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "total_time" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"time" integer NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session_day" ADD CONSTRAINT "session_day_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_workout" ADD CONSTRAINT "session_workout_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "total_time" ADD CONSTRAINT "total_time_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;