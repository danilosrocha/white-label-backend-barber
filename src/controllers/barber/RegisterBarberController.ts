import { Request, Response } from "express"
import { RegisterBarberSevice } from "../../services/barber/RegisterBarberSevice"

class RegisterBarberController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const { barber_name, available_at } = req.body

        const registerBarberSevice = new RegisterBarberSevice()

        const barber = await registerBarberSevice.execute({ barber_name, available_at, user_id })

        return res.json(barber)
    }

}

export { RegisterBarberController }