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
        try {
            const { ok, error, users } = await this.service.getUsers()
            if (!ok) throw Error(error.message)

            return res.status(HttpStatus.OK).json({ok: true, users})
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @Post('create')
    @ApiOperation({ summary: '유저를 생성 API', description: '유저를 생성한다.' })
    @ApiCreatedResponse({ description: '유저를 생성한다.', type: CreateUserOutput })
    async createUser(
        @Body() createUserInput: CreateUserInput, 
        @Res() res: Response 
    ): Promise<Response> {
        try {
            const { ok, error, user } = await this.service.createUser(createUserInput);
            if (!ok) throw Error(error.message)
            
            return res.status(HttpStatus.CREATED).json({ ok: true, user })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ ok: false, error })
        }
    }

}
