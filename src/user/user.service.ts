import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { GetUsersOutput } from './dtos/get-users.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private readonly users: Repository<User>
    ) {}


    async getUsers (): Promise<GetUsersOutput> {
        try {
            const users = await this.users.find();
            return { ok: true, users }
        } catch (error) {
            return { ok: false, error }
        } 
    }

    async createUser( createUserInput: CreateUserInput ): Promise<CreateUserOutput> {
        try {
            const user = await this.users.save(this.users.create(createUserInput))
            return { ok: true, user }
        } catch (error) {
            return { ok: false, error }
        }
    }

}
