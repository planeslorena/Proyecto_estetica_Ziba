import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { DatabaseService } from './services/db.service';
import { JwtMiddlewareGuard } from './services/jwtGuard.service';

@Module({
  imports: [JwtModule.register({
    secret:
      'hjfdsalhfdsahfjkdsakreaurceukfbukalsfyuej43243545y47988367+++fdsfjhdsifyhujdshfjkdsahfjkdskgfhjdsgfygsuyejkgfhdjgfsgejfgdjhsdgfhjsekfyhdbsyfjegfjdysgfjyefgydegfhjseyrfeyr63254342343',
    signOptions: { expiresIn: '1h' },
  }),],
  
  controllers: [LoginController],
  providers: [LoginService,DatabaseService,JwtMiddlewareGuard],
  exports: [DatabaseService, JwtMiddlewareGuard, JwtModule],

})
export class CommonModule {}