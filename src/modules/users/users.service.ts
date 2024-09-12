import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/modules/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private readonly userRepository:Repository<Users>,
    ){}

    async findOne(email:string,pass:string):Promise<Users|undefined>{
        const user = await this.userRepository.findOneBy({
            email:email,
            password:pass
        });
        return user;
    }
}