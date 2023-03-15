import prismaClient from "../../prisma"

interface ListScheduleRequest {
    user_id: string
}

class ListScheduleService {
    async execute({ user_id }: ListScheduleRequest) {

        const schedule = await prismaClient.service.findMany({
            where: {
                AND: {
                    user_id,
                    status: true
                }
            },
            select: {
                id: true,
                status: true,
                customer: true,
                haircut: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                    }
                },
                time: true,
                date: true,
                barber: {
                    select: {
                        barber_name: true,
                    }
                }
            },
            orderBy: [
                { date: 'asc' },
                { time: 'asc' }
            ]
        })

        return schedule
    }
}

export { ListScheduleService }
