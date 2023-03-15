import { Request, Response } from "express"
import { SchedulesDaysService } from "../../services/utils/SchedulesDaysService"

class SchedulesDaysController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const schedulesDaysService = new SchedulesDaysService()

        const status = await schedulesDaysService.execute({ user_id })

        return res.json(status)
    }
}

export { SchedulesDaysController }