import { Router } from "express";
import { JobsModule } from "../app/jobs/JobsModule";
import { EnsureAuthenticate } from "../utils/middlewares/ensureAuth";

const routes = Router()
const { controller } = JobsModule.getInstances()

routes.post('/create_job',EnsureAuthenticate.execute, controller.create.bind(controller))
routes.post('/find_job', controller.find.bind(controller))

export { routes }