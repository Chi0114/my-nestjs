import { Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUtil } from 'src/common/utils/login.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService:JwtService,
        private readonly loginUtil:LoginUtil
    ){
        console.log("autservice init");
    }

    async signIn(email:string,pass:string):Promise<any>{
        
        let enPassword = this.loginUtil.encryptPassword(pass);

        console.log("auth service validateUser enter",email,enPassword);
        const user = await this.usersService.findOne(email,pass);
        console.log("auth service validateUser leave",user);
        if(user && user.password === enPassword){
            const payload = { sub: user.email, username: user.username };
        return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }else{
            throw new UnauthorizedException();
        }
    }

    //jwt
    // async login(user:any){
    //     const payload = {account:user.username,userId:user.id};
    //     return {
    //         access_token:this.jwtService.sign(payload)
    //     }
    // }

}