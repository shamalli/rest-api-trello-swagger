
# Задача:
1. Создать RESTful API с авторизацией для trello (trello.com) на nestjs (https://docs.nestjs.com/);

2. Реализовать функционал, схожий с trello, подключаться к апи trello.com не требуется;

3. Спроектировать структуру БД при помощи https://dbdiagram.io 

# Сущности:
пользователь;

колонка;

карточка;

комментарий.


Один пользователь может иметь несколько колонок. Одна колонка может иметь несколько карточек. Одна карточка может иметь несколько комментариев.

# Требования:
1. Создать авторизацию пользователя через емейл + пароль (предварительно создаем модель пользователя). В ответ пользователь должен получать JWT токен, который мы будем прикреплять в Authorization headers и, таким образом, будем идентифицировать пользователей на Backend;

2. Подключить базу данных MySQL/PostgreSQL;

3. Создать модели и реляционные связи между ними (пользователь, колонка, карточка, комментарий)&;

4. Создать CRUD (не используем CRUD модуль nest JS, пишем самостоятельно сервис) эндпоинты по REST-у. Например, юзера мы создаем через POST /users, конкретного юзера получаем через GET /users/{id}, колонки юзера получаем через GET /users/{id}/columns, удаляем через DELETE /users/{userId}/columns/{id} Более подробно читаем в интернете про конвенции RESTful API;

5. Должны валидировать все данные которые отправляет нам пользователь. Используем Validation pipe для этого. Валидация на емейл, строку, число, количество символов и т.д;

6. Должны проверять через Guards имеет ли право пользователь менять/удалять колонку/карточку/коммент (является ли владельцем этой сущности);

7. Используем для документации Swagger (в документации nest js описано подключение). Должны прописывать в swagger все эндпоинты и модели (ApiProperty, ApiTags, ApiOperation и т.п.).


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
"# rest-api-trello-swagger" 
