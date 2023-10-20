import { commonError } from "../../../utils/commonErrors";
import { STATUS_CODE } from "../../../utils/statusCode";
import { UserType } from "../../user/entities/User";
import { UserRepository } from "../../user/repositories/UserRepository";
import { AuthType } from "../utils/authTypes";
import  bcrypt  from "bcrypt"
import JWT from "jsonwebtoken";


class AuthService {
    constructor(private userRepository: UserRepository){}
    
    async login(data: AuthType){
        const user = await this.userRepository.findByEmail(data.email)
        if (!user){
            return commonError("Email or password is invalid", STATUS_CODE.BAD_REQUEST)
        }
        const passwordIsValid = bcrypt.compareSync(data.password, (user as unknown as UserType).password) //rever
        
        if(!passwordIsValid){
            return commonError("Email or password is invalid", STATUS_CODE.BAD_REQUEST)
        }
        const payload = { ...user}
        const secretKey = process.env.SECRET_KEY as string
        const options = {expiresIn: '1d'}
        const token = JWT.sign(payload, secretKey, options)
        return {token, user}
    }

}

export { AuthService }