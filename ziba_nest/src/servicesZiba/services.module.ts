import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';


@Module({
  imports: [CommonModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}