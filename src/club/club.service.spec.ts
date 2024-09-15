import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClubService } from './club.service';
import { ClubEntity } from './club.entity';
import { faker } from '@faker-js/faker';


describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<ClubEntity>;
  let clubsList: ClubEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<ClubEntity>>(getRepositoryToken(ClubEntity));
    await seedDatabase();
  });

  
const seedDatabase = async () => {
  repository.clear();
  clubsList = [];
  for(let i = 0; i < 5; i++){
      const club: ClubEntity = await repository.save({
      nombre: faker.company.name(),
      fechaFundacion: faker.lorem.sentence(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.sentence()
      });
      clubsList.push(club);
  }
};



it('should be defined', () => {
  expect(service).toBeDefined();
});


it('findAll should return all clubs', async () => {
  const clubs: ClubEntity[] = await service.findAll();
  expect(clubs).toBeDefined();
  expect(clubs).not.toBeNull();
  expect(clubs).toHaveLength(clubsList.length);
});

it('findOne should return a Club by id', async () => {
  const storedClub: ClubEntity = clubsList[0];
  const club: ClubEntity = await service.findOne(storedClub.id);
  expect(club).not.toBeNull();
  expect(club.nombre).toEqual(storedClub.nombre)
  expect(club.descripcion).toEqual(storedClub.descripcion)
  expect(club.imagen).toEqual(storedClub.imagen)
  expect(club.fechaFundacion).toEqual(storedClub.fechaFundacion)
});

it('findOne should throw an exception for an invalid Club', async () => {
  await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "El club con el id provisto no existe")
});



it('create should return a new Club', async () => {
  const club: ClubEntity = {
    id: "Id de prueba",
    nombre: faker.company.name(), 
    fechaFundacion: "2021-10-10",  
    imagen: "url.com", 
    descripcion: "Club de prueba", 
    socios: [],
  }

  const newClub: ClubEntity = await service.create(club);
  // expect(newClub).not.toBeNull();

  // const storedClub: ClubEntity = await repository.findOne({where: {id: newClub.id}})
  // expect(storedClub).not.toBeNull();
  // expect(storedClub.nombre).toEqual(newClub.nombre)
  // expect(storedClub.descripcion).toEqual(newClub.descripcion)
  // expect(storedClub.imagen).toEqual(newClub.imagen)
  // expect(storedClub.fechaFundacion).toEqual(newClub.fechaFundacion)

});

});