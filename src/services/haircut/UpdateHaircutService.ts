import prismaClient from "../../prisma";

interface HaircutRequest {
    user_id: string,
    haircut_id: string,
    name: string,
    price: number,
    status: boolean | string
    time: string
}

class UpdateHaircutService {
    async execute({ haircut_id, name, price, user_id, status = true, time }: HaircutRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                subscriptions: true
            }
        })

        if (user?.subscriptions?.status !== 'active') {
            throw new Error("Not authorized")
        }

        const haircut = await prismaClient.haircut.update({
            where: {
                id: haircut_id
            },
            data: {
                name: name,
                price: price,
                status: status === 'true' ? true : false,
                time,
            }
        })

        return haircut
    }
}

export { UpdateHaircutService }