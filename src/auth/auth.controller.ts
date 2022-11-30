import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetRawHeaders } from './decorators/raw-headers.decorator';
import { GetUser } from './decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { RolGuard } from './guards/rol/rol.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetRawHeaders() rawHeaders: any,
    @Headers() headers: any,
  ) {
    console.log('request de auth.controller', request);
    return {
      ok: true,
      message: 'Hola mundo Private',
      user,
      email,
      rawHeaders,
      headers,
    };
  }

  @Get('privateAdmin')
  @UseGuards(AuthGuard(), RolGuard)
  testinAdmin() {
    return { stado: 'privateAdmin' };
  }
}
