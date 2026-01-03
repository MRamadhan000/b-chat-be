import { IsEnum, IsArray, IsOptional, IsString, IsNumber, ArrayMinSize } from 'class-validator';
import { ConversationType } from '../entities/conversation.entity';

export class CreateConversationDto {
  @IsEnum(ConversationType)
  type: ConversationType;

  @IsString()
  @IsOptional()
  name?: string; // Biasanya diisi jika type adalah 'group'

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  participantIds: number[]; // Daftar ID user yang ingin diajak chat
}