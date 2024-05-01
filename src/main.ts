import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoDuplicateErrorFilter } from './filters/mongo-duplicate-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongoDuplicateErrorFilter());

  await app.listen(3000);
}
bootstrap();
