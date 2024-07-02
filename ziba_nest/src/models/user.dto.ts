import { IsInt, IsOptional, IsString } from 'class-validator';

class User {
  @IsInt()
  @IsOptional()
  id_user?: number;

  @IsString()
  mail: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsInt()
  dni: number;

  @IsInt()
  phone: number;

  @IsString()
  role: string
}

export default User;