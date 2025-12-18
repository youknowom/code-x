// import { pgTable, integer, varchar, json } from "drizzle-orm/pg-core";

// /* =========================
//    USERS TABLE
// ========================= */
// export const usersTable = pgTable("users", {
//   id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

//   name: varchar("name", { length: 255 }).notNull(),

//   email: varchar("email", { length: 255 }).notNull().unique(),

//   points: integer("points").default(0),

//   subscription: varchar("subscription", { length: 50 }),
// });

// /* =========================
//    COURSES TABLE
// ========================= */
// export const coursesTable = pgTable("courses", {
//   id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

//   courseId: integer("course_id").notNull().unique(),

//   title: varchar("title", { length: 255 }).notNull(),

//   description: varchar("description", { length: 500 }).notNull(),

//   bannerImage: varchar("banner_image", { length: 500 }).notNull(),

//   level: varchar("level", { length: 50 }).default("Beginner"),

//   tags: varchar("tags", { length: 255 }),
// });

// /* =========================
//    COURSE CHAPTERS TABLE
// ========================= */
// export const courseChaptersTable = pgTable("course_chapters", {
//   id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//   courseId: integer("course_id")
//     .notNull()
//     .references(() => coursesTable.courseId, {
//       onDelete: "cascade",
//     }),
//   chapterId: integer(),
//   name: varchar("name", { length: 255 }).notNull(),

//   description: varchar("description", { length: 500 }),

//   exercises: json("exercises"),
// });

import { pgTable, integer, varchar, json, unique } from "drizzle-orm/pg-core";

/* =========================
   USERS TABLE
========================= */
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  points: integer("points").default(0),

  subscription: varchar("subscription", { length: 50 }),
});

/* =========================
   COURSES TABLE
========================= */
export const coursesTable = pgTable("courses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  courseId: integer("course_id").notNull().unique(),

  title: varchar("title", { length: 255 }).notNull(),

  description: varchar("description", { length: 500 }).notNull(),

  bannerImage: varchar("banner_image", { length: 500 }).notNull(),

  level: varchar("level", { length: 50 }).default("Beginner"),

  tags: varchar("tags", { length: 255 }),
});

/* =========================
   COURSE CHAPTERS TABLE
========================= */
export const courseChaptersTable = pgTable(
  "course_chapters",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    courseId: integer("course_id")
      .notNull()
      .references(() => coursesTable.courseId, {
        onDelete: "cascade",
      }),

    // logical chapter order (1,2,3...)
    chapterId: integer("chapter_id").notNull(),

    name: varchar("name", { length: 255 }).notNull(),

    description: varchar("description", { length: 500 }),

    exercises: json("exercises"),
  },
  (table) => ({
    // prevent duplicate chapter numbers per course
    uniqueChapterPerCourse: unique().on(table.courseId, table.chapterId),
  })
);
