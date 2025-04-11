import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { ConfigModule } from '@nestjs/config';
import { BenefitModule } from './benefit/benefit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.db_connection_string ?? "" ),
    CollaboratorModule,
    BenefitModule
  ],
})
export class AppModule {}
