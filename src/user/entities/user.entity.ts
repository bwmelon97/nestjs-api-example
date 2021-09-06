import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

enum UserRole {
    admin   = 'admin',
    norm    = 'norm'
}

@Entity()
export class User extends CoreEntity {
    @IsEmail()
    @Column()
    @ApiProperty({ description: '이메일' })
    email: string;

    @IsString()
    @Column()
    @ApiProperty({ description: '이름' })
    name: string;

    @IsString()
    @Column()
    @ApiProperty({ description: '비밀번호' })
    password: string;

    @IsEnum(UserRole)
    @Column({type: 'enum', enum: UserRole})
    @ApiProperty({ description: 'User 타입' })
    role: UserRole;
}