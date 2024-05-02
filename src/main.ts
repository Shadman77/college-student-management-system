import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoDuplicateErrorFilter } from './filters/mongo-duplicate-error.filter';
import { UserSeederService } from './users/services/users-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userSeederService = app.get(UserSeederService)
  await userSeederService.seed();
  app.useGlobalFilters(new MongoDuplicateErrorFilter());

  await app.listen(3000);
}
bootstrap();
