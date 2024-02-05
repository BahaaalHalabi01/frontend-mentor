import { integer, sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';
import type { TReply, TUser } from '../routes/interactive_comments_section/user';


export const users = sqliteTable('users', {
	username: text('username').primaryKey(),
	image: blob('image', { mode: 'buffer' }).$type<string>()
});

export const comments = sqliteTable('comments', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	content: text('content'),
	createdAt: integer('createdAt', { mode: 'timestamp' }),
	score: integer('score', { mode: 'number' }),
  user:text('user',{mode:'json'}).$type<TUser>(),
  /** not best way but for simplicity store like this*/
  replies:text('replies',{mode:'json'}).$type<TReply[]>()

});
