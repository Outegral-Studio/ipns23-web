CREATE TABLE "classmates" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"hometown" text,
	"quote" text,
	"first_expertise" text NOT NULL,
	"second_expertise" text,
	"high_school" text,
	"grad_school" text,
	"self_intro" text,
	"experience" text,
	"clubs" text[] DEFAULT '{}',
	"hobbies" text[] DEFAULT '{}',
	"social_media" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "memories" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL
);