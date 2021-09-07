## 1. Install Packages for typeORM with MySQL

```bash
$ yarn add @nestjs/typeorm typeorm mysql2
```

## 2. Add TypeOrmModule to App Module

src/app.module.ts
```tsx
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './example/entities/example.entity'

@Module({
  imports: [
		...
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,           // 'mysql'
      host: process.env.DB_HOST,           // 'localhost'
      port: +process.env.DB_PORT,          // 3306
      username: process.env.DB_USERNAME,   // 'root'
      password: process.env.DB_PASSWORD,   // '1234'
      database: process.env.DB_NAME,       // 'example'
      entities: [User],
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true
    }),
    ...
  ],
})
export class AppModule {}
```

### 2-1. Or use `ormconfig.json`
app.module.ts를 깔끔히 만들고 싶다면, TypeOrmModule의 옵션을 별도의 json 파일로 빼낼 수 있다.

파일명은 `ormconfig.json`으로 해야하고 프로젝트 최상위(root) 디렉토리에 위치해야 한다.

src/app.module.ts
```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
...

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ...
  ],
})
export class AppModule {}
```

ormconfig.json
```json
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "12345",
    "database": "nest_example",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "logging": true
}
```

ormconfig.json 파일로는 모든 옵션이 제공되지 않기 때문에, 막히는 일이 생기면 [공홈 문서](https://docs.nestjs.com/techniques/database#typeorm-integration)를 참고하자.


### 2-2. Or Create Database Module

JHyeok 님의 방법 참고

https://github.com/JHyeok/nestjs-api-example/tree/master/src/database


## 3. Create Entity
> Entity is a class that maps to a database table. 

**Model**에 해당하는 개념. DB 테이블에 저장되는 데이터의 형태를 정의하는 클래스이다. (Column을 정의한다.)

```ts
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
```

```ts
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

enum UserRole {
    admin   = 'admin',
    norm    = 'norm'
}

@Entity()
export class User extends CoreEntity {
    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRole})
    role: UserRole;
}
```
`@Entity()` 클래스 데코레이터를 통해 클래스를 Entity로 만들 수 있고,

`@Column()` 프로퍼티 데코레이터를 통해 property를 Column으로 만들 수 있다. 
`@PrimaryGeneratedColumn`, `@CreateDateColumn()`와 같은 특수 Column도 있다.

One-to-One, Many-to-One, Many-to-Many 추가


## 4. Add Entity to TypeORM Module
Entity는 TypeModule의 forFeature와 forRoot 모두에 등록해주어야 한다.

* `forFeature` 는 해당 Entity(또는 Repository)를 사용하는 모듈에서 import한다. 

  user.module.ts
  ```ts
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { User } from './entities/user.entity';

  @Module({
    imports: [TypeOrmModule.forFeature([User])],
    ...
  })
  export class UserModule {}
  ```

* `forRoot` 는 app.module.ts 또는 ormconfig.json 에서 import

  app.module.ts
  ```ts
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { User } from './example/entities/example.entity'

  @Module({
    imports: [
      ...
      TypeOrmModule.forRoot({ ... , 
        entities: [User] 
      }),
    ],
  })
  export class AppModule {}
  ```


## 5. Inject Repository into Service

user.service.ts
```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private readonly users: Repository<User>
    ) {}

    async getUsers (): Promise<GetUsersOutput> { ... }

    async createUser( 
        createUserInput: CreateUserInput 
    ): Promise<CreateUserOutput> { ... }
}
```
[Repository를 이용하여 CRUD 구현하기]()


## 6. Customize Own Repository
추가하기