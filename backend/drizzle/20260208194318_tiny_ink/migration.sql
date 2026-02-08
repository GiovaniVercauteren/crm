ALTER TABLE "users" ADD COLUMN "password" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "salt" text DEFAULT '' NOT NULL;