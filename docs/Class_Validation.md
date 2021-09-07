Class의 property들의 타입을 체크하는 기능이다.

## 1. 필요한 패키지 설치
```bash
$ yarn add class-validator class-transformer
```

## 2. App에 Validation Pipe 적용하기
src/main.ts
```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe() )

  await app.listen(3000);
}
bootstrap();
```

## 3. Entity와 DTO class의 property type validation
core.entity.ts
```ts
import { IsDate, IsNumber } from "class-validator";

@Entity()
export class CoreEntity {
    @IsNumber()
    id: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
```

user.entity.ts
```ts
import { IsEmail, IsEnum, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";

enum UserRole {
    admin   = 'admin',
    norm    = 'norm'
}

@Entity()
export class User extends CoreEntity {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}
```