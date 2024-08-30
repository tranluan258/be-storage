CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(50),
	"full_name" text,
	"avatar" text,
	"password" text
);
