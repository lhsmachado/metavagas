import { Router } from "express";
import { UserModule } from "../app/user/UserModule";

const routes = Router()
const { controller } = UserModule.getInstances()

routes.post('/create_user', controller.create.bind(controller))


export { routes }