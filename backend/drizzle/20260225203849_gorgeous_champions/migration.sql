CREATE TABLE "user_verification_tokens" (
	"id" serial PRIMARY KEY,
	"user_id" serial,
	"email" text NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verified_at" timestamp;--> statement-breakpoint
ALTER TABLE "user_verification_tokens" ADD CONSTRAINT "user_verification_tokens_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;