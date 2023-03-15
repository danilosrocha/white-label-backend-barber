import prismaClient from "../../prisma"
import moment from 'moment';

interface CheckSubscription {
    user_id: string
}

class SchedulesDaysService {
    async execute({ user_id }: CheckSubscription) {

        const schedules = await prismaClient.service.findMany({
            where: {
                AND: {
                    user_id,
                    status: true
                }
            },
            select: {
                date: true
            },
            orderBy: [
                { date: 'asc' },
                { time: 'asc' }
            ]
        })

        let uniqueDates = schedules.reduce((unique: any, current: any) => {
            const index = unique.findIndex((item: any) => item === current.date)
            if (index === -1) {
                return [...unique, current.date]
            }
            return unique
        }, [])

        uniqueDates = uniqueDates.map((date) => {
            return moment(date, "DD/MM").format("DD/MM")
        })

        const sortedDates = uniqueDates.sort((date1, date2) => {
            const moment1 = moment(date1, "DD/MM");
            const moment2 = moment(date2, "DD/MM");

            if (moment1.month() !== moment2.month()) {
                return moment1.month() - moment2.month();
            }

            return moment1.date() - moment2.date();
        });

        return sortedDates;
    }
}

export { SchedulesDaysService }
