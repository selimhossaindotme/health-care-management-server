import { Router } from "express";
import { userRouter } from "../modules/users/user.route";
import { scheduleRouter } from "../modules/schedule/schedule.route";
import { doctorScheduleRouter } from "../modules/doctorSchedule/doctorSchedule.route";

const router = Router();

const moduleRoutes = [
    {
         path:'/user',
         route: userRouter
    },
    {
        path:'/schedule',
        route: scheduleRouter
    },
    {
        path:'/doctorSchedule',
        route: doctorScheduleRouter
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router;