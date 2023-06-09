import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/models/user.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login_auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}

  async registration(userDto: CreateUserDto){
    const condidate = await this.userService.getUserByEmail(userDto.email);
    if(condidate){
      throw new HttpException(
        'Bunday Foydalanuvchi mavjud',
        HttpStatus.BAD_REQUEST
      )
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword
    })
    return this.generateToken(user);    
  }
  
  private async generateToken(user: User){
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(loginDto: LoginDto){
    const user = await this.userService.getUserByEmail(loginDto.email);
    if(!user){
      throw new UnauthorizedException("Email yoki parol noto'g'ri")
    }
    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if(validPassword){
      return user;
    }
    throw new UnauthorizedException("Email yoki parol noto'g'ri")
  }

  async login(loginDto: LoginDto){
    const user = await this.validateUser(loginDto);
    if(!user){
      throw new HttpException("Foydalanuvchi topilmadi", HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user);
  }
}
