import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
	.setTitle('REST API')
	.setDescription('REST API - Trello - Swagger description')
	.setVersion('1.0')
	.addBearerAuth({
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
		in: 'header',
		name: 'Authorization',
		description: 'Enter your Bearer token',
	},
	'bearer')
    .build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			security: [{ 'bearer': [] }],
			tagsSorter: 'alpha',
			operationsSorter: 'alpha',
		},
	});

	app.useGlobalPipes(new ValidationPipe());
	
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
