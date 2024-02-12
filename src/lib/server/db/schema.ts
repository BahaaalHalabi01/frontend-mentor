import type { TReply } from '$src/routes/interactive_comments_section/user.svelte';
import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  username: text('username').primaryKey(),
  image: blob('image', { mode: 'buffer' }).$type<string>()
});

export const comments = sqliteTable('comments', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  content: text('content'),
  createdAt: text('createdAt'),
  score: integer('score', { mode: 'number' }),
  userId: text('userId').references(() => users.username),
  /** not best way but for simplicity store like this*/
  replies: text('replies', { mode: 'json' }).$type<TReply[]>()
});

export const usersRelations = relations(users, ({ many }) => ({
  comments: many(comments)
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.username],
  }),
}));
