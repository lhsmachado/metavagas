import { commonError } from "../../../utils/commonErrors";
import { STATUS_CODE } from "../../../utils/statusCode";
import { UserType } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt"

class UserService {
    constructor(private repository:UserRepository){}

    async create (data: UserType){
        const userAllReadyExist = await this.repository.findByEmail(data.email)
        if (userAllReadyExist){
            return commonError("User already exists", STATUS_CODE.BAD_REQUEST)
        }

        const userToSave = {
            ...data,
            password: bcrypt.hashSync(data.password, 8)
        }
        return await this.repository.create(userToSave)
    }


}

export { UserService }