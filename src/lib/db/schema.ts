
import { pgTable, text, jsonb, smallserial } from "drizzle-orm/pg-core";



export const classmates = pgTable("classmates", {
    id: smallserial("id").primaryKey(),
    name: text("name").notNull(),
	image: text("image"),
    hometown: text("hometown"),
    quote: text("quote"),
    firstExpertise: text("first_expertise").notNull(),
    secondExpertise: text("second_expertise"),
    highSchool: text("high_school"),
    gradSchool: text("grad_school"),
    selfIntro: text("self_intro"),
    experience: text("experience"),
    clubs: text("clubs").array().default([]),
    hobbies: text("hobbies").array().default([]),
    socialMedia: jsonb("social_media").notNull().default({}),
});
export type Classmate = typeof classmates.$inferSelect;

export const memories = pgTable("memories", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    placeholder: text("placeholder"),
});
export type Memory = typeof memories.$inferSelect;