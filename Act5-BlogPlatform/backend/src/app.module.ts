// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
