import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    password: string;
}