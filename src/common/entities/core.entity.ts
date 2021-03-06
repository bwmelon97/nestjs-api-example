import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CoreEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id' })
    id: number;

    @IsDate()
    @CreateDateColumn()
    @ApiProperty({ description: '생성 시각' })
    createdAt: Date;

    @IsDate()
    @UpdateDateColumn()
    @ApiProperty({ description: '수정 시각' })
    updatedAt: Date;
}