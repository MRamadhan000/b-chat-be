// conversation-member.entity.ts
import {
  Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Conversation } from './conversation.entity';

@Entity('conversation_members')
export class ConversationMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  conversation: Conversation;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  joinedAt: Date;
}