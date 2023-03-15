import prismaClient from "../../prisma";

interface BarberRequest {
    user_id: string,
    barber_name?: string,
    barber_id: string
    available_at?: string[]
}


class UpdateBarberService {
    async execute({ user_id, barber_name, barber_id, available_at }: BarberRequest) {

        if (!barber_name) {
            throw new Error("Erro update barber!")
        }

        try {
            const barberExists = await prismaClient.barber.findFirst({
                where: {
                    AND: {
                        id: barber_id,
                        user_id,
                    }
                }
            })

            if (!barberExists) {
                throw new Error("Erro update barber! Nao localizado")
            }

            const barber = await prismaClient.barber.update({
                where: {
                    id: barber_id
                },
                data: {
                    barber_name,
                    available_at
                }
            })

            return barber
        } catch (error) {
            console.log(error);
            throw new Error("Erro update barber!")
        }

    }
}

export { UpdateBarberService }