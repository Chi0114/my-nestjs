import { Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards, Logger} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: Logger,
       
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginDto) {
        //TODO 参数校验失败
        this.logger.log('signIn', signInDto);
        this.logger.debug('Calling login()', AuthController.name);
        this.logger.verbose('Calling login()', AuthController.name);
        this.logger.warn('Calling login()', AuthController.name);
        try {
            throw new Error()
          } catch (e) {
            this.logger.error('Calling getHello()', e.stack, AuthController.name);
          }
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}