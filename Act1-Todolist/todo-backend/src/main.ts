import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('To-Do List API')
    .setDescription('CRUD API for managing tasks')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server
  await app.listen(3000);
  console.log(`Server running on http://localhost:3000`);
  console.log(`Swagger Docs: http://localhost:3000/api`);
}

bootstrap();
