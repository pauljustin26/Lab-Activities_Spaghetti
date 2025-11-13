// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my NestJS backend')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Backend server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();
