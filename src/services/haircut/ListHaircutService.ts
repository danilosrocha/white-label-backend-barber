import prismaClient from "../../prisma";

interface HaircutRequest {
    user_id: string,
    status: boolean | string
}

class ListHaircutService {
    async execute({ status, user_id }: HaircutRequest) {

        if (!user_id) {
            return []
        }

        const haircuts = await prismaClient.haircut.findMany({
            where: {
                AND: {
                    user_id: user_id,
                    status: status === 'true' ? true : false
                }
            }
        })

        return haircuts
    }
}

export { ListHaircutService }