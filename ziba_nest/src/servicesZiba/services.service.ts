import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/services/db.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import servicesQueries from './services.queries';
import Services from 'src/models/services.dto';


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
                professional: `${rs['name']} ${rs['lastname']}`,
                services: []
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
                    se.services.push(rs['service'])
                }
                return resultServices
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
                date: `${rs['date'].getDate()}-${rs['date'].getMonth()+1}-${rs['date'].getFullYear()}`,
                hour: rs['hour'],
                service: rs['service'],
                user: `${rs['name']} ${rs['lastname']}`,
            };
        });
        return resultApponitments;
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

    async deleteService(id_service:number): Promise<void> {
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
            );}

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

        async deleteAppointment(id_appointment:number): Promise<void> {
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
            );}
        } catch (error) {
            throw new HttpException(
                `Error eliminando turno: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}