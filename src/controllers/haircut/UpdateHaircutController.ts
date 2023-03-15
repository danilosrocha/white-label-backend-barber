import { Request, Response } from "express"
import { UpdateHaircutService } from "../../services/haircut/UpdateHaircutService"

class UpdateHaircutController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const { haircut_id, name, price, status, time } = req.body

        const updateHaircutService = new UpdateHaircutService()

        const haircut = await updateHaircutService.execute({ haircut_id, name, price, status, user_id, time })

        return res.json(haircut)
    }

}

export { UpdateHaircutController }

