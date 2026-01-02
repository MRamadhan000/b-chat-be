import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateFriendStatusDto } from './dto/update-friend.dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }
  @Get()
  async someMethod() {
    const data = await this.friendsService.getAll();
    return {
      message: "Data Successfully Get",
      data: data
    }
  }

  @Get('my-request')
  @UseGuards(JwtAuthGuard)
  async getRequest(
    @GetUser('id') userId: number
  ) {
    const data = await this.friendsService.getAllFriendRequest(userId);
    return {
      message: "Data Successfully Get for my req",
      data: data
    }
  }

  @Get('my-friends')
  @UseGuards(JwtAuthGuard)
  async myRequest(
    @GetUser('id') userId: number
  ) {
    const data = await this.friendsService.getMyFriends(userId);
    return {
      message: "Data Successfully Get for my req",
      data: data
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(
    @GetUser('id') userId: number,
    @Body() createFriendDto: CreateFriendDto) {
    const data = await this.friendsService.create(createFriendDto, userId)
    return {
      message: "Success Create Request",
      data: data
    }
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: number,
    @GetUser('id') userId: number
  ) {
    await this.friendsService.delete(+id, userId);
    return {
      message: "Data Successfully Deleted"
    };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') friendId: number,
    @Body() updateStatusDto: UpdateFriendStatusDto,
    @GetUser('id') userId: number,
  ) {
    // Kita ambil status dari DTO dan kirim ke service
    const data = await this.friendsService.updateStatus(
      +friendId,
      updateStatusDto.status,
      userId
    );

    return {
      message: "Friend status updated successfully",
      data: data
    };
  }
}