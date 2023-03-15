import moment from "moment"
import prismaClient from "../../prisma"

interface NewScheduleRequest {
    user_id: string
    haircut_id: string
    customer: string
    barber_id: string
    time: string
    date: string
    time_occuped: string[]
}

class NewScheduleService {
    async execute({ customer, haircut_id, user_id, barber_id, time, date, time_occuped }: NewScheduleRequest) {
        if (!customer || !haircut_id || !user_id || !barber_id || !time || !date) {
            throw new Error("Error schedule new service")
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
                throw new Error("Barber not exists!")
            }

            const newDate = moment(date, "DD/MM").format("DD/MM")

            const scheduleExists = await prismaClient.service.findFirst({
                where: {
                    AND: {
                        barber_id,
                        date: newDate,
                        time,
                        status: true
                    }
                }
            })

            if (scheduleExists) {
                throw new Error("Schedule already exists!")
            }

            await prismaClient.barber.update({
                where: {
                    id: barber_id
                },
                data: {
                    hair_cuts: (barberExists.hair_cuts + 1)
                }
            })

            const schedule = await prismaClient.service.create({
                data: {
                    customer,
                    haircut_id,
                    user_id,
                    barber_id,
                    date: newDate,
                    time,
                    time_occuped,
                }
            })

            return schedule

        } catch (error) {
            throw new Error(error)
        }
    }
}

export { NewScheduleService }