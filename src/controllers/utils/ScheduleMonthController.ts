import { Request, Response } from "express"
import { ScheduleMonthService } from "../../services/utils/ScheduleMonthService"

class ScheduleMonthController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const month = req.query.month as string

        const scheduleMonth = new ScheduleMonthService()

        const status = await scheduleMonth.execute({ user_id, month })

        return res.json(status)
    }
}

export { ScheduleMonthController }