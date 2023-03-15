import { Request, Response } from "express"
import { ListHaircutService } from "../../services/haircut/ListHaircutService"

class ListHaircutController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id ? req.user_id : req.query ? req.query.user_id as string : null;

        const status = req.query.status as string

        const listHaircutService = new ListHaircutService()

        const haircuts = await listHaircutService.execute({ status, user_id })

        return res.json(haircuts)
    }

}

export { ListHaircutController }