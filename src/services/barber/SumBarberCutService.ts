import prismaClient from "../../prisma";

interface BarberRequest {
    user_id: string,
    hair_cuts?: number,
    barber_id: string
}

class SumBarberCutService {
    async execute({ user_id, hair_cuts, barber_id }: BarberRequest) {

        if (!hair_cuts || !barber_id) {
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
                throw new Error("Erro update barber!")
            }

            const barber = await prismaClient.barber.update({
                where: {
                    id: barber_id
                },
                data: {
                    hair_cuts,
                }
            })

            return barber
        } catch (error) {
            console.log(error);
            throw new Error("Erro update barber!")
        }

    }
}

export { SumBarberCutService }