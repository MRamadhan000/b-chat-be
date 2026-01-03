import { IsEnum, IsArray, IsOptional, IsString, IsNumber, ArrayMinSize } from 'class-validator';
import { ConversationType } from '../entities/conversation.entity';

export class CreateConversationGrupDto {
  @IsEnum(ConversationType)
  type: ConversationType;

  @IsString()
  @IsOptional()
  name?: string; // Biasanya diisi jika type adalah 'group'

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  participantIds: number[];

  @IsOptional()
  @IsNumber()
  ownerId?: number; // ID user yang menjadi owner grup (opsional)
}