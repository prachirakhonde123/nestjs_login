import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext): User => {
        const req = ctx.switchToHttp().getRequest()
        return req.user;
    }
)


/*
We are returing user object , which we are getting in req from the protected route,
i.e after passing bearer token 
user: User {
    id: '3573be25-51e6-4dd1-9fb6-f1d3a8978e19',
    username: 'Hello_World',
    password: '$2a$10$zTdeMmC3vWQ4peRmeyoyku67tVAFRPTY73.C2Oi1J3Ubo9CulNd.S'
},
*/