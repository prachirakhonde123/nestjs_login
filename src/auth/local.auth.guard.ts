import { Injectable,UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    handleRequest(err, user, info, context) {
        const req = context.switchToHttp().getRequest();
        // console.log('Request body:', req.body);
        console.log('Handling request in LocalAuthGuard', { err, user, info });

        if(user){
            console.log('auth user is...',user)
        }

        if (err || !user) {
            throw err || new UnauthorizedException(info?.message || 'Unauthorized');
        }

        return user;
    }
}