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

  @UseGuards(JwtMiddlewareGuard)
  @Get('/report/admin')
  async getAllForReportAdmin() {
    return this.servicesService.getAllForReportAdmin();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Get('/report/prof/:id_user')
  async getAllForReportprof(@Param('id_user', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, }),) id_user: number) {
    return this.servicesService.getAllForReportProf(id_user);
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