import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Example table - customize this for your app
export const items = pgTable("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Add more tables here as you build features
