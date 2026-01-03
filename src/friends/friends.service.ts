import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend, FriendStatus } from './entities/friend.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { CreateConversationDto } from 'src/conversations/dto/create-conversation.dto';
import { ConversationType } from 'src/conversations/entities/conversation.entity';

@Injectable()
export class FriendsService {
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>

    constructor(private readonly userService: UsersService,
    private readonly conversationService: ConversationsService
    ) { }

    async createPrivateRequest(createFriendDto: CreateFriendDto, userId: number) {
        const requesterUser = await this.userService.findById(userId);
        const addresseUser = await this.userService.findById(createFriendDto.addresseeId);

        const friendRequest = this.friendRepository.create({
            requester: requesterUser,
            addressee: addresseUser,
            status: FriendStatus.PENDING,
        });

        const createFriend = this.friendRepository.create(friendRequest);
        return await this.friendRepository.save(createFriend);
    }

    async getAll() {
        return this.friendRepository.find({ relations: ['requester', 'addressee'] })
    }

    async findById(id: number) {
        const friend = await this.friendRepository.findOne({
            where: { id },
            relations: ['requester', 'addressee']
        })

        if (!friend)
            throw new NotFoundException(`Friend dengan ID ${id} tidak ditemukan`)

        return friend;
    }

    async delete(id: number, userId: number) {
        await this.userService.findById(userId);
        await this.findById(id);
        return await this.friendRepository.delete(id);
    }

    async updateStatus(friendId: number, status: string, userId: number) {
        await this.userService.findById(userId);
        const data = await this.findById(friendId);

        const newStatus = status.toLocaleLowerCase() as FriendStatus;

        const validStatuses = Object.values(FriendStatus) as string[];
        if (!validStatuses.includes(newStatus)) {
            throw new BadRequestException(`Status ${status} tidak valid. Pilih: ${validStatuses.join(', ')}`);
        }

        if (userId != data.addressee.id) {
            throw new UnauthorizedException("Anda tidak diperkenankan mengubah data ini")
        }

        if (newStatus === data.status) {
            throw new ConflictException("Statusnya sudah sama")
        }

        // data.status = newStatus;
        if (newStatus == FriendStatus.ACCEPTED) {
            await this.friendRepository.save(data)            

            // createConversationObjectWithPrivateType
            const createConversationPrivate: CreateConversationDto = {
                participantIds: [userId, data.requester.id],
                type: ConversationType.PRIVATE,
            }
            return await this.conversationService.createPrivateConversation(createConversationPrivate);
        }
    }

    async getAllFriendRequest(userId: number) {
        await this.userService.findById(userId);

        const requestList = await this.friendRepository.find({
            where: {
                requester: { id: userId }
            },
            relations: ['requester', 'addressee']
        })
        return requestList
    }

    async getMyFriends(userId: number) {
        await this.userService.findById(userId);

        const friends = await this.friendRepository.find({
            where: [
                { requester: { id: userId }, status: FriendStatus.ACCEPTED },

                { addressee: { id: userId }, status: FriendStatus.ACCEPTED }

            ],
            relations: ['requester', 'addressee']
        })

        return friends
    }

}