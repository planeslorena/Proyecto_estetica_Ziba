import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from 'src/common/services/login.service';

@Controller('/auth')
export class LoginController {

  constructor(private loginService: LoginService) {}

  @Post('/login')
  async login(@Body() body: { username: string; password: string }) {
    //Primero se valida que el usuario exista y la password me coincida con lo almacenado en la BD
    const user = await this.loginService.validateUser(body.username, body.password);

    //Retorno el JWT(token)
    return this.loginService.login(user);
  }


}