import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('CounterService (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/counter/get (GET)', () => {
    return request(app.getHttpServer()).get('/counter/get').expect(200);
  });

  it('/counter/plus (GET)', () => {
    return request(app.getHttpServer()).get('/counter/plus').expect(200);
  });

  it('/counter/reset (GET)', () => {
    return request(app.getHttpServer()).get('/counter/reset').expect(200);
  });
});
