import prismaClient from "../../prisma"

interface ListBarberRequest {
    user_id: string
    status: string | boolean
}

class ListBarberService {
    async execute({ user_id, status }: ListBarberRequest) {

        if (!user_id) {
            return []
        }

        const barber = await prismaClient.barber.findMany({
            where: {
                AND: {
                    user_id: user_id,
                    status: status === 'true' ? true : false
                }
            },
            select: {
                id: true,
                barber_name: true,
                hair_cuts: true,
                status: true,
                available_at: true,
                haircuts: {
                    orderBy: {
                        name: 'asc'
                    },
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        time: true,
                        status: true
                    }
                }
            }
        })


        return barber
    }
}

export { ListBarberService }