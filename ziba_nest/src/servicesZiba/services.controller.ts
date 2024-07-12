import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, Delete, HttpStatus, Put, Query } from '@nestjs/common';
import { JwtMiddlewareGuard } from 'src/common/services/jwtGuard.service';
import { ServicesService } from './services.service';
import Appointment from 'src/models/appointment.dto';

@Controller('/services')
export class ServicesController {

  constructor(private servicesService: ServicesService) { }

  //OBTENER LOS SERVICIOS PARA EL HOME Y EL TURNERO
  @Get()
  async getAllServices() {
    return this.servicesService.getAll();
  }

  //OBTIENE LOS SERVICIO PARA LA PAGE DE ADMIN
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

  //OBTENER LOS TURNOS DE UN CLIENTE
  @UseGuards(JwtMiddlewareGuard)
  @Get('/appointments/client/:id_user')
  async getClientAppointments(@Param('id_user', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_user: number) {
    return this.servicesService.getClientAppointments(id_user);
  }

  //OBTENER LOS TURNOS DE UN PROFESIONAL
  @UseGuards(JwtMiddlewareGuard)
  @Get('/appointments/prof/:id_user')
  async getProfAppointments(@Param('id_user', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_user: number) {
    return this.servicesService.getProfAppointments(id_user);
  }

  //OBTENER LOS HORARIOS DISPONIBLES DE UN SERVICIO
  @Get('/availableTimes')
  async getAvailableTimes(
    @Query('id_service') id_service: number,
    @Query('day') day: string,
  ) {
    return this.servicesService.getAvailableTimes(id_service, day);
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

  //CREAR SERVICIO
  @UseGuards(JwtMiddlewareGuard)
  @Post('/appointments')
  async createAppointment(@Body() body: Appointment) {
    return this.servicesService.createAppointment(body);
  }

  //MARCAR COMO ATENDIDO EL TURNO
  @UseGuards(JwtMiddlewareGuard)
  @Put('/appointments/:id_appointment')
  async updateAppointment(@Param('id_appointment', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_appointment: number) {
    return this.servicesService.updateAppointment(id_appointment);
  }

  //ELIMINAR TURNO
  @UseGuards(JwtMiddlewareGuard)
  @Delete('/appointments/:id_appointment')
  async deleteAppointment(
    @Param('id_appointment', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_appointment: number): Promise<void> {
    this.servicesService.deleteAppointment(id_appointment);
  }


} 