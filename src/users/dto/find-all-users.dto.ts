import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '../roles.enum';

export class FindAllUsersDto {
  @IsOptional()
  @IsEnum(Role, {
    message: 'role must be one of: ADMIN, ENG, INTERN',
  })
  role?: Role;
}
