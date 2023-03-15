import { Request, Response } from "express";
import { DeleteBarberService } from "../../services/barber/DeleteBarberService";

class DeleteBarberController {
    async handle(req: Request, res: Response) {
        const { barber_id } = req.body

        const user_id = req.user_id

        const deleteBarberService = new DeleteBarberService()

        const barber = await deleteBarberService.execute({ barber_id, user_id })

        return res.json(barber)
    }
}

export { DeleteBarberController }

