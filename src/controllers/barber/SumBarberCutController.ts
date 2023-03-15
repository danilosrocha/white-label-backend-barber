import { Request, Response } from "express"
import { SumBarberCutService } from "../../services/barber/SumBarberCutService"

class SumBarberCutController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const { hair_cuts, barber_id } = req.body

        const sumBarberCutService = new SumBarberCutService()

        const barber = await sumBarberCutService.execute({ hair_cuts, barber_id, user_id })

        return res.json(barber)
    }

}

export { SumBarberCutController }

