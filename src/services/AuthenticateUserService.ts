import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs"
import {sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest{
    email: string,
    password: string
}


class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest){

        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({
            email
        })

        const passwordMatch = await compare(password, user.password)

        if (!user || !passwordMatch){
            throw new Error("invalid email/password")
        }

        const token = sign( 
            {email: user.email} , 
            "385bec99296c01d835f9ff1d2a1c3443", 
            {
                subject :user.id, 
                expiresIn : "1d"
            }     
        )
        return token
    }
}

export {AuthenticateUserService}