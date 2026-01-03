import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { UsersModule } from 'src/users/users.module';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
  imports : [TypeOrmModule.forFeature([Friend]), UsersModule, ConversationsModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
