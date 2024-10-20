CREATE TABLE IF NOT EXISTS "drives" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"type" varchar NOT NULL,
	"parent_id" serial NOT NULL,
	"url" varchar,
	"metadada" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
