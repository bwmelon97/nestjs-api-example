
## 1. 패키지 설치
```bash
$ yarn add @nestjs/swagger swagger-ui-express
```

## 2. Swagger Module을 통해 document 생성
main.ts에서 Swagger document를 생성하고, `SwaggerModule`에 `url`, `app`, `document`를 인자로 넘겨주어 Swagger UI 페이지를 실행할 수 있다.

main.ts
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utills/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
  
    const options = new DocumentBuilder()
    .setTitle('My Title')
    .setDescription('discription')
    .setVersion('1.0.0')
    .build()

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document)
    
    await app.listen(3000);
}
bootstrap();
```

`http://localhost/api-docs/` 경로로 들어가면 Swagger UI 화면을 확인할 수 있다.

main.ts에 있던 `SwaggerModule` 관련 내용을 utils 디렉토리의 swagger.ts에 `setupSwagger` 함수로 정의해서 리팩토링 할 수 있다.

main.ts
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utills/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    setupSwagger(app)
    await app.listen(3000);
}
bootstrap();
```

utils/swagger.ts
```ts
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
    .setTitle('My Title')
    .setDescription('discription')
    .setVersion('1.0.0')
    .build()

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document)
}
```


## 3. Entity 및 DTO에 `@ApiProperty` 등록

user.entity.ts
```ts
import { ApiProperty } from "@nestjs/swagger";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

enum UserRole {
    admin   = 'admin',
    norm    = 'norm'
}

@Entity()
export class User extends CoreEntity {
    @Column()
    @ApiProperty({ description: '이메일' })
    email: string;

    @Column()
    @ApiProperty({ description: '이름' })
    name: string;

    @Column()
    @ApiProperty({ description: '비밀번호' })
    password: string;

    @Column({type: 'enum', enum: UserRole})
    @ApiProperty({ description: 'User 타입' })
    role: UserRole;
}
```

### Swagger UI에 나타난 Schema 확인
사진 추가


## 4. Controller API에 설명 추가

user.controller.ts
```ts
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { GetUsersOutput } from './dtos/get-users.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('유저 API')
export class UserController {

    constructor(
        private readonly service: UserService
    ) {}

    @Get('all')
    @ApiOperation({ 
        summary: '모든 유저 GET API', 
        description: 'DB에 저장된 모든 유저의 리스트를 반환한다.' 
    })
    @ApiOkResponse({ 
        description: 'DB에 저장된 모든 유저의 리스트를 반환한다.',
        type: GetUsersOutput
    })
    async users( @Res() res: Response ): Promise<Response> {
        ...
    }

    @Post('create')
    @ApiOperation({ summary: '유저를 생성 API', description: '유저를 생성한다.' })
    @ApiCreatedResponse({ description: '유저를 생성한다.', type: CreateUserOutput })
    async createUser(
        @Body() createUserInput: CreateUserInput, 
        @Res() res: Response 
    ): Promise<Response> {
       ...
    }

}
```

### Swagger UI에서 API 실행하기
사진 추가