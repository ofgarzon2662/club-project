import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ClubEntity } from './club.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClubService {
    constructor(
        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>,
    ) {}

    // Obtener todos los clubes
    async findAll(): Promise<ClubEntity[]> {
        return await this.clubRepository.find({ relations: ["socios"] });
    }

    // Obtener un club por id

    async findOne(id: string): Promise<ClubEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id}, relations: ["socios"] } );
        if (!club)
          throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
    
        return club;
    }
}
