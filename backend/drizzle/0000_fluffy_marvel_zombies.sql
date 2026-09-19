CREATE TYPE "public"."region" AS ENUM('NORTH', 'SOUTH');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'MANAGER');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" "user_role" NOT NULL,
	"region" "region",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"region" "region" NOT NULL,
	"joined_on" date
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(50),
	"level" varchar(20),
	"instructor" varchar(100),
	"duration_weeks" integer
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	"enrolled_on" date,
	"completion_status" varchar(50),
	"grade" varchar(5),
	"rating" integer,
	"fee_paid" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;