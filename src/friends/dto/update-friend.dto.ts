// dto/update-friend-status.dto.ts
import { IsEnum, IsNotEmpty } from 'class-validator';
import { FriendStatus } from '../entities/friend.entity';

export class UpdateFriendStatusDto {
    @IsEnum(FriendStatus, { 
        message: 'Status harus berupa: pending, accepted, rejected, atau blocked' 
    })
    @IsNotEmpty()
    status: FriendStatus;
}