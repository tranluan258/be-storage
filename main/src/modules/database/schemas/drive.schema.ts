import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  serial,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

export const drives = pgTable('drives', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  type: varchar('type').notNull(),
  parent_id: serial('parent_id'),
  user_id: serial('user_id').notNull(),
  url: varchar('url'),
  metadada: jsonb('metadada'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const parentDrives = relations(drives, ({ many }) => ({
  childrens: many(drives),
}));

export const childrenDrives = relations(drives, ({ one }) => ({
  parent: one(drives, {
    fields: [drives.parent_id],
    references: [drives.id],
  }),
}));

export type Drive = typeof drives.$inferSelect;
export type NewDrive = typeof drives.$inferInsert;
export type InsertDrive = Omit<NewDrive, 'id'>;
