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
    email: string;

    @IsString()
    @Column()
    name: string;

    @IsString()
    @Column()
    password: string;

    @IsEnum(UserRole)
    @Column({type: 'enum', enum: UserRole})
    role: UserRole;
}