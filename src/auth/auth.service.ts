import { Injectable, UnauthorizedException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) // Use @InjectRepository with the User entity instead of UserRepository
        private userRepository: Repository<User>,
        private jwtService : JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ username, password: hashedPassword });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialDto: AuthCredentialsDto): Promise<{accessToken : string}> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload : JwtPayload = {username}
            const accessToken:string = await this.jwtService.sign(payload);
            return {accessToken}
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
