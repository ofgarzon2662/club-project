import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubEntity } from './club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity])],
  providers: [ClubService],
})
export class ClubModule {}
