import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import User from 'src/models/user.dto';
import { UserService } from './user.service';
import { JwtMiddlewareGuard } from 'src/common/services/jwtGuard.service';

@Controller('/user')
export class UserController {
  
  constructor(private userService: UserService) {}
  
  @UseGuards(JwtMiddlewareGuard)
  @Get('/info')
  async getUserInfo(@Req() request:any) {
    return request.user;
  }

  @Post()
  async createUser(@Body() body: User) {
   return this.userService.createUser(body);
  }


} 