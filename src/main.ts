import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from './pipe/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const PORT = process.env.PORT || 1987;

  app.useGlobalPipes(new ValidationPipe());

 const config = new DocumentBuilder()
  .setTitle('NestJS TEST')
  .setDescription('REST API')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgres, Sequalize')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>{
    console.log(`${PORT}th port is running!`);
    
  });
}
bootstrap();
