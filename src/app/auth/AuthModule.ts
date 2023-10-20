import { UserModule } from "../user/UserModule";
import { User } from "../user/entities/User";
import { UserRepository } from "../user/repositories/UserRepository";
import { AuthController } from "./controllers/AuthController";
import { AuthService } from "./services/AuthService";

class AuthModule{
    static getInstances(){
        const repository = new UserRepository(User as any)
        const service = new AuthService(repository)
        const controller = new AuthController(service)
        return {service, controller}
    }
}

export { AuthModule }