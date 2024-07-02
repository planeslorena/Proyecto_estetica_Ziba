import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, Delete, HttpStatus, Put } from '@nestjs/common';
import { JwtMiddlewareGuard } from 'src/common/services/jwtGuard.service';
import { ServicesService } from './services.service';

@Controller('/services')
export class ServicesController {

  constructor(private servicesService: ServicesService) { }

  @Get()
  async getAllServices() {
    return this.servicesService.getAll();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Get('/admin')
  async getAllForAdmin() {
    return this.servicesService.getAllForAdmin();
  }

  //OBTENER TODOS LOS TURNOS RESERVADOS
  @UseGuards(JwtMiddlewareGuard)
  @Get('/appointments')
  async getAllAppointments() {
    return this.servicesService.getAllApponintments();
  }

  //OBTENER LAS ESPECIALIDADES VACANTES
  @UseGuards(JwtMiddlewareGuard)
  @Get('/specialties')
  async getSpecialtiesWhitoutProf() {
    return this.servicesService.getSpecialtiesWhitoutProf();
  }

  //OBTENER LAS ESPECIALIDADES OFRECIDAS
  @UseGuards(JwtMiddlewareGuard)
  @Get('/specialtieswithprof')
  async getAllSpecialtiesWithProf() {
    return this.servicesService.getAllSpecialtiesWithProf();
  }

  //CREAR SERVICIO
  @UseGuards(JwtMiddlewareGuard)
  @Post()
  async createService(@Body() body: any) {
    return this.servicesService.createService(body);
  }

  //ACTUALIZAR SERVICIO
  @UseGuards(JwtMiddlewareGuard)
  @Put()
  async updateClient(@Body() body: any) {
    return this.servicesService.updateService(body);
  }

  //ELIMINAR SERVICIO
  @UseGuards(JwtMiddlewareGuard)
  @Delete('/:id_service')
  async deleteUser(
    @Param('id_service', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_service: number): Promise<void> {
    this.servicesService.deleteService(id_service);
  }

  //ELIMINAR TURNO
  @UseGuards(JwtMiddlewareGuard)
  @Delete('/appointments/:id_appointment')
  async deleteAppointment(
    @Param('id_appointment', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_appointment: number): Promise<void> {
    this.servicesService.deleteAppointment(id_appointment);
  }
} 