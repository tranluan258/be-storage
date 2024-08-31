CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(50) NOT NULL,
	"full_name" text NOT NULL,
	"avatar" text,
	"password" text
);
