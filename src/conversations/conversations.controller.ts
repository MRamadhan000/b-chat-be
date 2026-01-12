import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationGroupDto } from './dto/create-conversation-grup.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) { }

  @Post('group')
  async createGroup(@Body() dto: CreateConversationGroupDto) {
    return await this.conversationsService.createGrupConversation(dto);
  }
}
