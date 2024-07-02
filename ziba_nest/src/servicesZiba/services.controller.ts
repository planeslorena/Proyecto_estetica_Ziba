import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import User from 'src/models/user.dto';
import { JwtMiddlewareGuard } from 'src/common/services/jwtGuard.service';
import { ServicesService } from './services.service';

@Controller('/services')
export class ServicesController {
  
  constructor(private servicesService: ServicesService) {}
  
  @Get()
  async getAllServices() {
    return this.servicesService.getAll();
  }

 

} 