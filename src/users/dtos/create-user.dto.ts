import { PickType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

export class CreateUserInput extends PickType(
    User, ['email', 'name', 'password']
) {}

export class CreateUserOutput extends CoreOutput {
    user?: User;
}