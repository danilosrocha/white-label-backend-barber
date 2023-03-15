import { Request, Response } from "express";
import { CheckUserService } from "../../services/utils/CheckUserService";

class CheckUserController {
    async handle(req: Request, res: Response) {
        const name = req.query.name as string

        const checkUser = new CheckUserService()

        const count = await checkUser.execute({ name })

        return res.json(count)
    }
}

export { CheckUserController }