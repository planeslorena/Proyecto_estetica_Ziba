import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ServicesModule } from './servicesZiba/services.module';
@Module({
  imports: [UserModule, CommonModule, ServicesModule],  
  controllers: [],
  providers: [],
})
export class AppModule {}
