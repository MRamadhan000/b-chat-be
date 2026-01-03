import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, ConversationType } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { ConversationMember } from './entities/conversation-member.entity';
import { existsSync } from 'fs';
import { CreateConversationMemberDto } from './dto/create-converastion-member.dto';
@Injectable()
export class ConversationsService {
  @InjectRepository(Conversation)
  private conversationRepository: Repository<Conversation>;

  @InjectRepository(ConversationMember)
  private conversationMemberRepository: Repository<ConversationMember>;

  async findExistingPrivateChat(userIds: number[]): Promise<Conversation | null> {
    const [id1, id2] = userIds;

    return await this.conversationRepository.createQueryBuilder('conv')
      .innerJoin('conversation_members', 'm1', 'm1.conversationId = conv.id')
      .innerJoin('conversation_members', 'm2', 'm2.conversationId = conv.id')
      .where('conv.type = :type', { type: ConversationType.PRIVATE })
      .andWhere('m1.userId = :user1', { user1: id1 })
      .andWhere('m2.userId = :user2', { user2: id2 })
      .getOne();
  }

  async addMembersToConversation(conversationId: number, userIds: number[]) {
    const memberEntities = userIds.map((id) => {
      return this.conversationMemberRepository.create({
        conversation: { id: conversationId },
        user: { id: id },
      });
    });
    return await this.conversationMemberRepository.save(memberEntities);
  }

  async createPrivateConversation(createConversationDto: CreateConversationDto) {
    const existingPrivateChat = await this.findExistingPrivateChat(createConversationDto.participantIds);
    if (existingPrivateChat) return existingPrivateChat;    

    const newConversation = this.conversationRepository.create({
      type: ConversationType.PRIVATE,
      name: createConversationDto.name || 'Private Chat',
    });

    const savedConversation = await this.conversationRepository.save(newConversation);

    const members = await this.addMembersToConversation(
      savedConversation.id,
      createConversationDto.participantIds
    );

    return {
      ...savedConversation,
      members: members
    };
  }

}