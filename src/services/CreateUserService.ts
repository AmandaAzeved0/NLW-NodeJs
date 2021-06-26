
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

interface IUserRequest{
    name: string
    email: string
    admin? : boolean //opcional
    password : string

}

class CreateUserService{
    async execute({name, email, admin=false, password}: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories)

        if(!email){
            throw new Error ("invalid email")
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if (userAlreadyExists){
            throw new Error ("user already exists")
        }

        //criptografando a senha
        const passwordHash = await hash(password, 8)
        const user = usersRepository.create({ 
            name, 
            email, 
            admin,
            password: passwordHash
        })

        await usersRepository.save(user)

        return user

    }
}

export { CreateUserService }