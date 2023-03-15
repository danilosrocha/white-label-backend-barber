import prismaClient from "../../prisma"

interface CheckSubscription {
    name: string
}

class CheckUserService {
    async execute({ name }: CheckSubscription) {

        const user = await prismaClient.user.findFirst({
            where: {
                name
            },
            select: {
                id: true
            }
        })

        return user
    }
}

export { CheckUserService }