import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtMiddlewareGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenEncabezado(request.headers.authorization);

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken) {
      return false;
    }
    if (new Date(decodedToken.exp * 1000) < new Date()) {
      return false;
    }
    request.user = decodedToken;
    return true;
  }

  private getTokenEncabezado(encabezadoAuth: string): string | null {
    if (!encabezadoAuth?.startsWith('Bearer ')) {
      return null;
    }
    return encabezadoAuth.split(' ')[1];
  }
}