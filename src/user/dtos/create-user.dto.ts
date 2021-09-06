import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

export class CreateUserInput extends PickType(
    User, ['email', 'name', 'password']
) {}

export class CreateUserOutput extends CoreOutput {
    @ApiPropertyOptional({ description: '생성된 User 정보' })
    user?: User;
}