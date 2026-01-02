import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  @InjectRepository(User)
  private userRepository: Repository<User>

  async create(registerDto: RegisterDto) {
    await this.checkDuplicateEmail(registerDto.email)

    try {
      const salt = await bcrypt.genSalt();

      const hashedPassword = await bcrypt.hash(registerDto.password, salt);

      const newUser = this.userRepository.create({
        ...registerDto,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(newUser);

      return savedUser;

    } catch (error) {
      throw new InternalServerErrorException('Gagal membuat akun')
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new NotFoundException(`User dengan email ${email} tidak ditemukan`)
    }

    return user;
  }

  async findAllUser(){
    return await this.userRepository.find();
  }

  async findById(id: number) {    
    const user = await this.userRepository.findOne({
      where: { id }
    })

    if (!user)
      throw new NotFoundException(`User dengan ID ${id} tidak ditemukan`)

    return user;
  }

  async checkDuplicateEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email }
    })

    console.log(user);


    if (user)
      throw new ConflictException(`Email ${email} telah digunakan`)
  }
}