import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CoreOutput {
    @ApiProperty({ description: 'API의 정상적 작동 완료 여부' })
    ok: boolean;

    @ApiPropertyOptional({ description: 'API Error' })
    error?: Error;
}