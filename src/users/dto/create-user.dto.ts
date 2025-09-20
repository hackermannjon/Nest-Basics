import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from '../roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Role, {
    message: 'role must be one of the following values: ADMIN, ENG, INTERN',
  })
  role: Role;
}
