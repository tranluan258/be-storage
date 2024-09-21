import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', {
    length: 50,
  }).notNull(),
  fullName: text('full_name').notNull(),
  avatar: text('avatar'),
  password: text('password'),
});

export type User = typeof users.$inferSelect; // return type when queried
export type UserIgnorePassword = Omit<User, 'password'>;
export type InsertUser = Omit<User, 'avatar' | 'id'>;
export type NewUser = typeof users.$inferInsert; // insert type
