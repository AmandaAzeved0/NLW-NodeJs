
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest{
    name: string
    email: string
    admin? : boolean //opcional

}

class CreateUserService{
    async execute({name, email, admin}: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories)

        if(!email){
            throw new Error ("invalid email")
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        })

        if (userAlreadyExists){
            throw new Error ("user already exists")
        }

        const user = usersRepository.create({ 
            name, 
            email, 
            admin 
        })

        await usersRepository.save(user)

        return user

    }
}

export { CreateUserService }