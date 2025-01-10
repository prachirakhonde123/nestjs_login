import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: Function) {
        console.log('Serializing user:................', user);
        done(null, user);
    }

    deserializeUser(payload: any, done: Function) {
        console.log('Deserializing user:', payload);
        done(null, payload); 
    }
}
