import { Request, Response } from "express"
import { UpdateBarberService } from "../../services/barber/UpdateBarberService"

class UpdateBarberController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const { barber_name, barber_id, available_at } = req.body

        const updateBarberService = new UpdateBarberService()

        const barber = await updateBarberService.execute({ barber_name, barber_id, user_id, available_at })

        return res.json(barber)
    }

}

export { UpdateBarberController }

