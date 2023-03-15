import { Router, Request, Response } from "express";

// Middleware
import { isAuthenticated } from './middlewares/isAuthenticated'
// User
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
// Haircut
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";
import { ListBarberHaircutController } from "./controllers/haircut/ListBarberHaircutController";
// Utils
import { CheckSubscriptionController } from "./controllers/utils/CheckSubscriptionController";
import { CountHaircutsController } from "./controllers/utils/CountHaircutsController";
import { SchedulesDaysController } from "./controllers/utils/SchedulesDaysController";
import { CheckTimeAvaliableController } from "./controllers/utils/CheckTimeAvaliableController";
import { ScheduleMonthController } from "./controllers/utils/ScheduleMonthController";
// Schedule
import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";
// Barber
import { RegisterBarberController } from "./controllers/barber/RegisterBarberController";
import { ListBarberController } from "./controllers/barber/ListBarberController";
import { DeleteBarberController } from "./controllers/barber/DeleteBarberController";
import { UpdateBarberController } from "./controllers/barber/UpdateBarberController";
import { SumBarberCutController } from "./controllers/barber/SumBarberCutController";
import { GetBarberController } from "./controllers/barber/GetBarberController";
import { CheckUserController } from "./controllers/utils/CheckUserController";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    type ConfigUserProps = "Bigode Grosso" | "Danilo";

    let configUser: ConfigUserProps;

    const envValue = process.env.USER_CONFIG;

    if (!envValue) {
        throw new Error("USER_CONFIG environment variable is not defined.");
    }

    configUser = envValue as ConfigUserProps;

    return res.json(configUser)
})

// Routes - User
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

router.put('/user/update', isAuthenticated, new UpdateUserController().handle)

// Routes - Haircuts
router.post('/haircut', isAuthenticated, new CreateHaircutController().handle)

router.get('/haircuts', isAuthenticated, new ListHaircutController().handle)

router.put('/haircut', isAuthenticated, new UpdateHaircutController().handle)

router.get('/haircut/detail', isAuthenticated, new DetailHaircutController().handle)

router.get('/haircuts/barber', isAuthenticated, new ListBarberHaircutController().handle)

// Routes - Utils
router.get('/check', isAuthenticated, new CheckSubscriptionController().handle)

router.get('/haircuts/count', isAuthenticated, new CountHaircutsController().handle)

router.get('/schedule/days', isAuthenticated, new SchedulesDaysController().handle)

router.get('/barber/times', isAuthenticated, new CheckTimeAvaliableController().handle)

router.get('/user/check', new CheckUserController().handle)

router.get('/schedules/month', isAuthenticated, new ScheduleMonthController().handle)

// Routes - Schedule
router.post('/schedule', isAuthenticated, new NewScheduleController().handle)

router.get('/schedules', isAuthenticated, new ListScheduleController().handle)

router.delete('/schedule', isAuthenticated, new FinishScheduleController().handle)

// Routes - Barber
router.post('/barber', isAuthenticated, new RegisterBarberController().handle)

router.get('/barbers', isAuthenticated, new ListBarberController().handle)

router.get('/barber', isAuthenticated, new GetBarberController().handle)

router.put('/barber/del', isAuthenticated, new DeleteBarberController().handle)

router.put('/barber', isAuthenticated, new UpdateBarberController().handle)

router.put('/barber/count', isAuthenticated, new SumBarberCutController().handle)

// Routes - FastRegister
router.get('/haircuts/fast', new ListHaircutController().handle)

router.get('/barbers/fast', new ListBarberController().handle)

router.get('/barber/fast', new GetBarberController().handle)

router.get('/barber/times/fast', new CheckTimeAvaliableController().handle)

router.get('/schedule/days/fast', new SchedulesDaysController().handle)

router.post('/schedule/fast', new NewScheduleController().handle)

router.get('/haircuts/barber/fast', isAuthenticated, new ListBarberHaircutController().handle)

export { router }