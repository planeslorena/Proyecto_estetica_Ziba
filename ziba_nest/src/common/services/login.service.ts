import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import User from 'src/models/user.dto';
import { DatabaseService } from './db.service';
import { RowDataPacket } from 'mysql2/promise';
import userQueries from 'src/user/queries/user.queries';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService, private dbService:DatabaseService) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    //obtengo el usuario de la base de datos buscando por mail
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      userQueries.selectUserByMail,
      [username],
    );

    if (resultQuery.length === 0) {
      //si la consulta no trae resultado el usuario no existe o esta deshabilitado, genero el error
      throw new HttpException('Acceso denegado', HttpStatus.UNAUTHORIZED)
    }

    const user = {
      username: resultQuery[0].email,
      password: resultQuery[0].password,
      role: resultQuery[0].role,
      name: resultQuery[0].name
    };

    //Si lo encuentra debo chequear que la contraseña sea la misma
    if (await bcrypt.compare(password, user.password)) {
      // retorno el objeto usuario
      return {
        username: username,
        role: user.role,
        name: user.name,
      };
    } else {
      //Si la contraseña es incorrecta retorno el error
      throw new HttpException('Acceso denegado', HttpStatus.UNAUTHORIZED)
    }
  }

  login(user: any) {
    //Genero el payload para crear el token
    const payload = { usuario: user };
    //Genero el token y lo retorno
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}