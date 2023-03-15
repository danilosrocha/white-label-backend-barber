import { Request, Response } from 'express'
import { UpdateUserService } from '../../services/user/UpdateUserService'

class UpdateUserController {
  async handle(req: Request, res: Response) {

    const user_id = req.user_id;

    const { address, name } = req.body

    const updateUserService = new UpdateUserService();

    const detailUser = await updateUserService.execute({ address, name, user_id });

    return res.json(detailUser);

  }
}

export { UpdateUserController }