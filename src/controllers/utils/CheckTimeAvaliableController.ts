import { Request, Response } from "express"
import { CheckTimeAvaliableService } from "../../services/utils/CheckTimeAvaliableService"

class CheckTimeAvaliableController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const barber_id = req.query.barber_id as string

        const date = req.query.date as string

        const checkTimeAvaliable = new CheckTimeAvaliableService()

        const timeIsFree = await checkTimeAvaliable.execute({ user_id, barber_id, date })

        return res.json(timeIsFree)
    }
}

export { CheckTimeAvaliableController }