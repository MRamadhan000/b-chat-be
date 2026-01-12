import {
  IsArray,
  IsString,
  IsNumber,
  ArrayMinSize,
  ArrayUnique,
  IsNotEmpty,
  Equals,
} from 'class-validator';
import { ConversationType } from '../entities/conversation.entity';

export class CreateConversationGroupDto {

  @Equals(ConversationType.GROUP, {
    message: 'Conversation type must be GROUP',
  })
  type: ConversationType;

  @IsString({ message: 'Group name must be a string' })
  @IsNotEmpty({ message: 'Group name is required' })
  name: string;

  @IsArray({ message: 'Participant IDs must be an array' })
  @IsNumber({}, { each: true, message: 'Each participant ID must be a number' })
  @ArrayMinSize(2, {
    message: 'Group must contain at least 2 participants (excluding owner)',
  })
  @ArrayUnique({
    message: 'Participant IDs must be unique',
  })
  participantIds: number[];

  @IsNumber({}, { message: 'Owner ID must be a number' })
  ownerId: number;
}