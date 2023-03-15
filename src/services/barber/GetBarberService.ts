import prismaClient from "../../prisma"

interface ListBarberRequest {
    user_id: string
    barber_id: string
}

class GetBarberService {
    async execute({ user_id, barber_id }: ListBarberRequest) {

        const barber = await prismaClient.barber.findFirst({
            where: {
                AND: {
                    id: barber_id,
                    user_id,
                }
            },
            select: {
                id: true,
                barber_name: true,
                hair_cuts: true,
                status: true,
                available_at: true,
                services: {
                    select: {
                        id: true,
                        customer: true,
                        haircut: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            }
                        }
                    }
                }

            }
        })

        return barber
    }
}

export { GetBarberService }