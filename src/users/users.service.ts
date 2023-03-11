import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { ActivateUserDto } from './dto/active_user.dto';
import { AdminUserDto } from './dto/admin_user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User){}

  async createUser(createUserDto: CreateUserDto){
    const newUser = await this.userRepository.create(createUserDto);
    return newUser;
  };

  async getUserByEmail(email: string){
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    })
    return user;
  }

  async adminUser(adminUserDto: AdminUserDto){
    const user = await this.userRepository.findByPk(adminUserDto.userId);
    if(!user){
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }
    user.is_admin = true;
    await user.save();
    return user;
  }

  async noadminUser(noadminUserDto: AdminUserDto){
    const user = await this.userRepository.findByPk(noadminUserDto.userId);
    if(!user){
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }
    user.is_admin = false;
    await user.save();
    return user;
  }

  async activateUser(activateUserDto: ActivateUserDto){
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if(!user){
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }
    user.is_active = true;
    await user.save();
    return user;
  }

  async deactivateUser(activateUserDto: ActivateUserDto){
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if(!user){
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }
    user.is_active = false;
    await user.save();
    return user;
  }

  async getAllUsers(){
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getOneUser(id: number){
    const user = await this.userRepository.findOne({
      where: {id},
      include: {all: true}
    });
    return user;
  }

  async deleteUser(id: number){
    const user = await this.userRepository.destroy({ where: { id }});
    if(!user){
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }
    
    return { message: "Foydalanuvchi o'chirildi"};
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto){
    const user = await this.userRepository.update(updateUserDto, {
        where: {id},
        returning: true
    });
    return user;
  }
}
