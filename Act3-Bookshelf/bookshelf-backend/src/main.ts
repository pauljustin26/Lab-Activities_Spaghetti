import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Bookshelf API')
    .setDescription('API for managing books, authors, and categories')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Backend running at http://localhost:3000');
  console.log('Swagger docs at http://localhost:3000/api');
}
bootstrap();
