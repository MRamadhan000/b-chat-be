import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateConversationMemberDto {
  @IsInt()
  @IsNotEmpty()
  conversationId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}