import { Request, Response } from "express";
import { GetBarberService } from "../../services/barber/GetBarberService";

class GetBarberController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id
        const barber_id = req.query.barber_id as string

        const getBarberService = new GetBarberService()

        const schedule = await getBarberService.execute({ user_id, barber_id })

        return res.json(schedule)
    }
}

export { GetBarberController }

