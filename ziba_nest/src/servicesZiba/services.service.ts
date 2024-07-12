import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/services/db.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import servicesQueries from './services.queries';
import Services from 'src/models/services.dto';
import userQueries from 'src/user/queries/user.queries';
import * as moment from 'moment';
import Appointment from 'src/models/appointment.dto';

@Injectable()
export class ServicesService {
    constructor(private dbService: DatabaseService) {
    }

    //Funcion que obtiene todos los servicios brindados por la estetica agrupados por especialidad
    async getAll(): Promise<Services[]> {

        //Primero se obtienen las especialidades
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectAllSpecialties,
            [],
        );

        let resultServices: Services[] = resultQuery.map((rs: RowDataPacket) => {
            return {
                speciality: rs['speciality'],
                id_professional: rs['id_professional'],
                professional: `${rs['name']} ${rs['lastname']}`,
                services: [],
                days: [],
                hour_begin: 0,
                hour_end: 0
            };
        });

        //luego obtengo los servicios para cada especilidad
        const resultQuery2: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectAllServices,
            [],
        );

        resultQuery2.map((rs: RowDataPacket) => {
            resultServices.map((se) => {
                if (rs['speciality'] == se.speciality) {
                    se.services.push(
                        {
                            id_service: rs['id_service'],
                            name: rs['service'],
                            price: rs['price'],
                            description: rs['description'],
                            duration: rs['duration']
                        })
                }
            })
        });

        const resultQuery3: RowDataPacket[] = await this.dbService.executeSelect(
            userQueries.selectProfessionalCalendar,
            [],
        );

        resultQuery3.map((rs: RowDataPacket) => {
            resultServices.map((se) => {
                if (rs['id_professional'] == se.id_professional) {
                    se.days.push(rs['week_day']);
                    se.hour_begin = rs['hour_begin'].substring(0, 5);
                    se.hour_end = rs['hour_end'].substring(0, 5);
                }
            })
        });

        return resultServices;
    }

    //Funcion que obtiene todos los servicios brindados por la estetica con especialidad, profesional y horarios
    async getAllForAdmin(): Promise<any[]> {

        //Primero se obtengo los servicio con especialidad y profesional
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectServiceWithSpeciality,
            [],
        );

        let resultServices: any[] = resultQuery.map((rs: RowDataPacket) => {
            return {
                id: rs['id_service'],
                service: rs['service'],
                description: rs['description'],
                speciality: rs['speciality'],
                professional: `${rs['name']} ${rs['lastname']}`,
                price: rs['price'],
            };
        });

        return resultServices;
    }

    //Funcion que obtiene todos los turnos reservados de hoy en adelante
    async getAllApponintments(): Promise<any[]> {

        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectAllAppointments,
            [],
        );

        let resultApponitments: any[] = resultQuery.map((rs: RowDataPacket) => {
            return {
                id: rs['id_appointment'],
                date: `${rs['date'].getDate()}-${rs['date'].getMonth() + 1}-${rs['date'].getFullYear()}`,
                hour: rs['hour'],
                service: rs['service'],
                user: `${rs['name']} ${rs['lastname']}`,
            };
        });
        return resultApponitments;
    }

    //Funcion que obtiene los turnos de un determinado cliente
    async getProfAppointments(id_user: number): Promise<any[]> {
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectAppointmentsbyProf,
            [id_user],
        );

        let resultAppointments: any[] = resultQuery.map((rs: RowDataPacket) => {
            return {
                id: rs['id_appointment'],
                attended: rs['state'],
                date: rs['date'],
                hour: rs['hour'],
                service: rs['service'],
                duration: rs['duration'],
                speciality: rs['speciality'],
                client: `${rs['name']} ${rs['lastname']}`,
                phone: rs['phone']
            };
        });
        return resultAppointments;
    }

    //Funcion que obtiene los turnos de un determinado profesional
    async getClientAppointments(id_user: number): Promise<any[]> {
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectAppointmentsbyClient,
            [id_user],
        );

        let resultAppointments: any[] = resultQuery.map((rs: RowDataPacket) => {
            return {
                id: rs['id_appointment'],
                date: rs['date'],
                hour: rs['hour'],
                service: rs['service'],
                duration: rs['duration'],
                speciality: rs['speciality'],
                professional: `${rs['name']} ${rs['lastname']}`,
            };
        });
        return resultAppointments;
    }

    //Función que obtiene los turnos disponibles para un servicio
    async getAvailableTimes(id_service: number, day: string): Promise<any[]> {

        //Se trae la duración del servicio (30,60,90,120 minutos) y los dias y horarios de atención del profesional
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectServiceById,
            [id_service],
        );

        if (resultQuery.length > 0) {
            //Horario que inicia a atender el profesional
            let horaInicial = moment(resultQuery[0].hour_begin, 'HH:mm');

            //Ultimo horario que se podria dar un turno: el horario donde finaliza a atender el profesional - la duracion del turno.
            const horaFinal = moment(resultQuery[0].hour_end, 'HH:mm').add(-resultQuery[0].duration, 'minutes');

            //Cargo todos los intervalos de horarios que podria atender el profesional para ese servicio, dependiendo la duracion
            //Ejemplo si la duracion es 60min, los intervalos serian [10:00,10:30], [10:30, 11:00],[11:00,11:30]
            const times: any[] = [];
            while (horaInicial <= horaFinal) {
                const time = Array.from({ length: resultQuery[0].duration / 30 }, (_, i: number) =>
                    moment(horaInicial).add(30 * i, 'minutes').format('HH:mm')
                );
                times.push(time)
                horaInicial = moment(horaInicial).add(30, 'minutes');
            }

            //Traigo los turnos ya reservados para ese profesional
            const resultQuery2: RowDataPacket[] = await this.dbService.executeSelect(
                servicesQueries.selectAppointmentsByDate,
                [day,
                    resultQuery[0].id_speciality
                ],
            );

            //De acuerdo a la duración del turno (cantidad es cuantas medias horas ocupa el turno) cargo los horarios reservados
            let appointments = [];
            resultQuery2.map(appoint => {
                for (let i = 1; i <= appoint.cantidad; i++) {
                    appointments.push(
                        moment(appoint['hour'], 'HH:mm').add(30 * (i - 1), 'minutes').format('HH:mm'),
                    );
                }
            })

            //Cargo los horarios disponibles: Chequeo que los intervalos no contengan horarios ya reservados
            let availableTimes = [];
            times.map(interval => {
                const availableInterval = !interval.some(time => appointments.includes(time));
                if (availableInterval) {
                    availableTimes.push(interval[0]);
                }
            })
            return availableTimes;
        } else {
            let availableTimes = [];
            return availableTimes
        }
    }

    //Función que obtiene las especialidades que no tienen un profesional asignado
    async getSpecialtiesWhitoutProf(): Promise<any[]> {

        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectSpecialtiesWhitoutProf,
            [],
        );

        let resultSpecialties: any[] = resultQuery.map((rs: RowDataPacket) => {
            return {
                id: rs['id_speciality'],
                speciality: rs['name']
            };
        });
        return resultSpecialties;
    }

    //Funcion que obtiene las especialidades que tienen profesionales activos
    async getAllSpecialtiesWithProf(): Promise<any[]> {

        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectAllSpecialties,
            [],
        );

        let resultSpecialties = resultQuery.map((rs: RowDataPacket) => {
            return {
                id: rs['id_speciality'],
                speciality: rs['speciality'],
            };
        });

        return resultSpecialties;
    }

    //Funcion para crear nuevos servicios
    async createService(data: any): Promise<string> {
        try {
            await this.dbService.executeQuery(
                servicesQueries.insertService,
                [
                    data.name,
                    data.id_speciality,
                    data.description,
                    data.price,
                    data.duration
                ],
            );
            return 'Servicio creado con exito'
        } catch (error) {
            throw new HttpException(
                `Error insertando servicio: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateService(service): Promise<string> {
        //Se actualiza la info del servicio en la DB
        try {
            const resultQuery = await this.dbService.executeQuery(
                servicesQueries.updateService,
                [
                    service.name,
                    service.id_speciality,
                    service.description,
                    service.price,
                    service.duration,
                    service.id_service
                ],
            );
            if (resultQuery.affectedRows == 1) {
                return 'Se actualizo el servicio correctamente';
            }
            throw new HttpException(
                'No se pudo actualizar el servicio',
                HttpStatus.NOT_FOUND,
            );
        } catch (error) {
            throw new HttpException(
                `Error actualizando servicio: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteService(id_service: number): Promise<void> {
        try {
            //Deshabilita el servicio de la tabla servicios
            const resultQuery = await this.dbService.executeQuery(
                servicesQueries.deleteService,
                [id_service],
            );
            if (resultQuery.affectedRows != 1) {
                throw new HttpException(
                    'No se pudo deshabilitar servicio',
                    HttpStatus.NOT_FOUND,
                );
            }

            //Borra los turnos futuros de ese servicio
            await this.dbService.executeQuery(
                servicesQueries.deleteAppointmentsbyService,
                [id_service],
            );
        } catch (error) {
            throw new HttpException(
                `Error deshabilitando servicio: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createAppointment(appoint: Appointment): Promise<string> {
        try {
            //Primero chequea que no se superponga ningun turno del usuario
            //Traigo todos los turnos del usuario para ese dia
            const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
                servicesQueries.selectAppointmentsByClientAndDate,
                [appoint.date,
                 appoint.id_user
                ],
            );

            //Cargo todos los horarios que ocupa el turno que se quiere reservar
            const times = Array.from({ length: appoint.duration / 30 }, (_, i: number) =>
                moment(appoint.hour,'HH:mm').add(30 * i, 'minutes').format('HH:mm')
            );

            //Inserto todos los horarios que ocupan esos turnos
            let appointments = [];
            resultQuery.map(appoint => {
                for (let i = 1; i <= appoint.cantidad; i++) {
                    appointments.push(
                        moment(appoint['hour'], 'HH:mm').add(30 * (i - 1), 'minutes').format('HH:mm'),
                    );
                }
            })

            //Chequeo si el turno que se quiere reservar se superpone con otro turno ya reservado
            if (times.some(time => appointments.includes(time))){
                throw new HttpException(
                    'El usuario ya tiene un turno en ese horario',
                    HttpStatus.CONFLICT,
                );
            }

            await this.dbService.executeQuery(
                servicesQueries.insertAppointment,
                [appoint.date,
                 appoint.hour,
                 appoint.id_user,
                 appoint.id_service
                ],
            );

            return 'Turno creado con exito';
        } catch (error) {
            throw new HttpException(
                `Error creando turno: ${error.message}`,
                error.status,
            );
        }
    }

    async deleteAppointment(id_appointment: number): Promise<void> {
        try {
            //Borra el turno con el id_appontment indicado
            const resultQuery = await this.dbService.executeQuery(
                servicesQueries.deleteAppointment,
                [id_appointment],
            );
            if (resultQuery.affectedRows != 1) {
                throw new HttpException(
                    'No se pudo eliminar, turno no encontrado',
                    HttpStatus.NOT_FOUND,
                );
            }
        } catch (error) {
            throw new HttpException(
                `Error eliminando turno: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateAppointment(id_appointment: number) {
        try {
            //Marca como atendido el turno
            const resultQuery = await this.dbService.executeQuery(
                servicesQueries.updateAppointment,
                [id_appointment],
            );
            if (resultQuery.affectedRows != 1) {
                throw new HttpException(
                    'No se pudo eliminar, turno no encontrado',
                    HttpStatus.NOT_FOUND,
                );
            }
        } catch (error) {
            throw new HttpException(
                `Error eliminando turno: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}