import prismaClient from "../../prisma"

interface FinishScheduleRequest {
    user_id: string
    schedule_id: string
    status: string | boolean
}

class FinishScheduleService {
    async execute({ schedule_id, user_id, status }: FinishScheduleRequest) {
        if (!schedule_id || !user_id || !status) {
            throw new Error("Error schedule finish service")
        }

        try {
            const belongsToUser = await prismaClient.service.findFirst({
                where: {
                    AND: {
                        id: schedule_id,
                        user_id: user_id
                    }
                }
            })

            if (!belongsToUser) {
                throw new Error("Not authorized")
            }

            if (status === "cancel") {
                const barberExists = await prismaClient.barber.findFirst({
                    where: {
                        AND: {
                            id: belongsToUser.barber_id,
                            user_id,
                        }
                    }
                })

                if (!barberExists) {
                    throw new Error("Not authorized")
                }

                await prismaClient.barber.update({
                    where: {
                        id: barberExists.id
                    },
                    data: {
                        hair_cuts: (barberExists.hair_cuts - 1)
                    }
                })

                await prismaClient.service.delete({
                    where: {
                        id: schedule_id
                    }
                })
            } else {
                await prismaClient.service.update({
                    where: {
                        id: schedule_id
                    },
                    data: {
                        status: false
                    }
                })
            }
            
            return { message: "Finalizado com sucesso" }
        } catch (error) {
            console.log(error);
        }

    }
}

export { FinishScheduleService }