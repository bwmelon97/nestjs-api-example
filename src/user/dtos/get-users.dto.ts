import { ApiPropertyOptional } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dtos/core-output.dto";
import { User } from "../entities/user.entity";

export class GetUsersOutput extends CoreOutput {
    @ApiPropertyOptional({ description: '모든 유저 List', type: [User] })
    users?: User[];
}