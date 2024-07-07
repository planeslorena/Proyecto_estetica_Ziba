import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import User from 'src/models/user.dto';
import { UserService } from './user.service';
import { JwtMiddlewareGuard } from 'src/common/services/jwtGuard.service';
import { DatabaseService } from 'src/common/services/db.service';
import { RowDataPacket } from 'mysql2/promise';
import userQueries from './queries/user.queries';

@Controller('/user')
export class UserController {

  constructor(private userService: UserService, private dbService: DatabaseService) { }

  //OBTENER INFORMACION DEL USUARIO LOGUEADO
  @UseGuards(JwtMiddlewareGuard)
  @Get('/info')
  async getUserInfo(@Req() request: any) {
    return request.user;
  }

  //OBTENER TODOS LOS CLIENTES
  @UseGuards(JwtMiddlewareGuard)
  @Get('/clients')
  async getAllClients() {
    return this.userService.getAllClients();
  }

  //OBTENER TODOS LOS PROFESIONALES
  @UseGuards(JwtMiddlewareGuard)
  @Get('/prof')
  async getAllProf() {
    return this.userService.getAllProf();
  }

  //CREAR USUARIO (AL REGISTRARSE EL CLIENTE O POR PARTE DEL ADMIN)
  @Post()
  async createUser(@Body() body: User) {
    return this.userService.createUser(body);
  }

  //CREAR PROFESIONAL 
  @UseGuards(JwtMiddlewareGuard)
  @Post('/prof')
  async createProf(@Body() body: any) {
    return this.userService.createProf(body);
  }

  //ACTUALIZAR CLIENTE
  @UseGuards(JwtMiddlewareGuard)
  @Put('/client')
  async updateClient(@Body() body: any) {
    return this.userService.updateUser(body);
  }

  //ACTUALIZAR PROFESIONAL
  @UseGuards(JwtMiddlewareGuard)
  @Put('/prof')
  async updateProf(@Body() body: any) {
    return this.userService.updateProf(body);
  }

  //DESHABILITAR CLIENTE
  @UseGuards(JwtMiddlewareGuard)
  @Delete('/client/:id_user')
  async deleteClient(
    @Param('id_user', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_user: number): Promise<void> {
    this.userService.deleteUser(id_user);
  }

  //DESHABILITAR PROFESIONAL 
  @UseGuards(JwtMiddlewareGuard)
  @Delete('/prof/:id_professional')
  async deleteProf(
    @Param('id_professional', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_professional: number): Promise<void> {

    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      userQueries.selectProfbyId,
      [id_professional],
    );
    const id_user = resultQuery[0].id_user;
    this.userService.deleteUser(id_user);
  }
} 