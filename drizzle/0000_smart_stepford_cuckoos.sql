-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "playing_with_neon" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" real,
	CONSTRAINT "playing_with_neon_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "playing_with_neon_name_not_null" CHECK (NOT NULL name)
);
--> statement-breakpoint
CREATE TABLE "emebrek" (
	"id" serial PRIMARY KEY NOT NULL,
	"nev" varchar(255),
	CONSTRAINT "emebrek_id_not_null" CHECK (NOT NULL id)
);

*/