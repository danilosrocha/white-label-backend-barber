import { Request, Response } from "express";
import { NewScheduleService } from "../../services/schedule/NewScheduleService";

class NewScheduleController {
    async handle(req: Request, res: Response) {
        const { haircut_id, customer, barber_id, time, date, time_occuped } = req.body
        const user_id = req.user_id ? req.user_id : req.body ? req.body.user_id : null;

        const newScheduleService = new NewScheduleService()

        const schedule = await newScheduleService.execute({ customer, haircut_id, user_id, barber_id, time, date, time_occuped })

        return res.json(schedule)
    }
}

export { NewScheduleController }

