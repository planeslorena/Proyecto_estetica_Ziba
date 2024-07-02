import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/services/db.service';
import * as bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import userQueries from './queries/user.queries';
import User from 'src/models/user.dto';


@Injectable()
export class UserService {
    constructor(private dbService: DatabaseService) {
    }

    async getUserByMail(mail: string): Promise<User> {
        //Se obtiene el usuario de la base de datos filtrando por mail
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            userQueries.selectUserByMail,
            [mail],
        );

        //Si no encuentro el usuario retorno null
        if (resultQuery.length == 0) {
            return null;
        //sino retorno el User
        } else {
            return {
                mail: resultQuery[0].mail, 
                role: resultQuery[0].role,
                name: resultQuery[0].name,
                lastname: resultQuery[0].lastname, 
                dni:resultQuery[0].dni,
                phone: resultQuery[0].phone,
            };
        }
    }

    async createUser(user: User): Promise<string> {
        //Se encripta la contraseña que llega de la registración
        const salt = await bcrypt.genSalt(8);
        const passEncryp = await bcrypt.hash(user.password, salt);

        //Pasar el nombre y apellido con la primera letra mayuscula
        const fixNameAndLastname = (text:string): string => {
            const arrayText = text.split(" ");

            for (let i= 0; i < arrayText.length; i++) {
                arrayText[i] = arrayText[i].charAt(0).toUpperCase() + arrayText[i].substring(1).toLowerCase();
            }
            return arrayText.join(" ");
        }

        //Se acomodan los datos para insertarlos en la DB
        user = {
            ...user,
            mail: user.mail.toLocaleLowerCase(), //pongo el mail todo en minuscula
            password: passEncryp, //se carga contraseña encriptada
            name: fixNameAndLastname(user.name),
            lastname: fixNameAndLastname(user.lastname),
        }

        //Se inserta la info en la DB
        try {
            await this.dbService.executeQuery(
                userQueries.insertUser,
                [
                    user.mail,
                    user.password,
                    user.name,
                    user.lastname,
                    user.dni,
                    user.phone,
                    user.role
                ],
            );
            return 'Usuario creado con exito';
        } catch (error) {
            //Si la DB retorna el error 1062 quiere decir que el mail ya existe en la misma
            if (error.errno == 1062) {
                throw new HttpException(
                    'El mail ya esta siendo utilizado por un usuario',
                    HttpStatus.CONFLICT,
                );
            }
            throw new HttpException(
                `Error insertando usuario: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}