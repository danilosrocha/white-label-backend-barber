import prismaClient from "../../prisma"

interface CheckSubscription {
    user_id: string
    month: string
}

class ScheduleMonthService {
    async execute({ user_id, month }: CheckSubscription) {

        const schedule = await prismaClient.service.findMany({
            where: {
                user_id,
            },
            select: {
                date: true,
                customer: true,
                barber: {
                    select: {
                        barber_name: true,
                    }
                },
                haircut: {
                    select: {
                        name: true,
                        price: true
                    }
                },
                status: true
            }
        })

        let schedules = 0
        const filteredSchedule = schedule.filter(scheduleItem => {
            if (!scheduleItem.status) {
                schedules++
            }
            const scheduleMonth = scheduleItem.date.split('/')[1]
            return scheduleMonth === month && scheduleItem.status === false && schedules
        })

        return { schedules: filteredSchedule, schedules_count: schedules }
    }
}

export { ScheduleMonthService }
