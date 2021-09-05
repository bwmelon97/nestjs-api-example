import { IsDate, IsNumber } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CoreEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;

    @IsDate()
    @CreateDateColumn()
    createdAt: Date;

    @IsDate()
    @CreateDateColumn()
    updatedAt: Date;
}