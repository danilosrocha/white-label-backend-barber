import { hash } from "bcryptjs"
import prismaClient from "../../prisma"

export interface CreateUserRequest {
    name: string,
    email: string
    password: string
    code: string
    address?: string
    strip_customer_id?: string
}

class CreateUserService {
    async execute({ email, name, password, code }: CreateUserRequest) {

        if (!email || !name || !password) {
            throw new Error("Email incorrect!")
        }

        if (code !== `${(process.env.JWT_SECRET).slice(0, 6)}`) {
            throw new Error("Code plataform incorrect!")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User/Email already exists!")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                password: passwordHash,
                email: email
            }, select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }