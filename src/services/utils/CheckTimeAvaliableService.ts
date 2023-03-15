import prismaClient from "../../prisma"
import moment from 'moment';

interface CheckSubscription {
    user_id: string
    barber_id: string
    date: string
}

interface ItemProps {
    date: string
    times: string[]
}

class CheckTimeAvaliableService {
    async execute({ user_id, barber_id, date }: CheckSubscription) {

        let barber = await prismaClient.barber.findFirst({
            where: {
                AND: {
                    id: barber_id,
                    user_id
                }
            },
            select: {
                id: true,
                barber_name: true,
                services: {
                    select: {
                        date: true,
                        time: true,
                        time_occuped: true
                    }
                }
            }
        })

        // let occupiedTimes = barber?.services.reduce((occupied: any, current: any) => {
        //     current.time_occuped.forEach((time: string) => {
        //         const index = occupied.findIndex((item: any) => item.date === current.date)
        //         if (index === -1) {
        //             occupied.push({
        //                 date: current.date,
        //                 times: [time]
        //             })
        //         } else {
        //             occupied[index].times.push(time)
        //         }
        //     })
        //     return occupied
        // }, [])

        const services = barber?.services.filter((service: any) => service.date === date); // filtra os serviços com a data desejada
        const times = services?.map((service: any) => service.time_occuped).flat(); // obtém somente os valores da propriedade time_occuped e aplanha o array resultante

        return times
    }
}

export { CheckTimeAvaliableService }