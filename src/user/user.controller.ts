import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserInput } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('')
export class UserController {

    constructor(
        private readonly service: UserService
    ) {}

    @Get('all')
    async users( @Res() res: Response ): Promise<Response> {
        try {
            const { ok, error, users } = await this.service.getUsers()
            if (!ok) throw Error(error.message)

            return res.status(HttpStatus.OK).json(users)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @Post('create')
    async createUser(
        @Body() createUserInput: CreateUserInput, 
        @Res() res: Response 
    ): Promise<Response> {
        try {
            const { ok, error, user } = await this.service.createUser(createUserInput);
            if (!ok) throw Error(error.message)
            
            return res.status(HttpStatus.CREATED).json(user)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

}
