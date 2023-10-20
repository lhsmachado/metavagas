import { Model, Types } from "mongoose"
import { UserType } from "../entities/User"
import { ErrorResponseType, commonError } from "../../../utils/commonErrors"
import { STATUS_CODE } from "../../../utils/statusCode"
import { UserFindByEmailResponse } from "../utils/UserTypes"

class UserRepository{
    constructor (private model: Model<UserType>){}

    async create(data: { password: string; createdAt: NativeDate; updatedAt: NativeDate; name: string; email: string; favorites: Types.ObjectId[]; searchs: { city?: string | undefined; technology?: string | undefined }[] }){
        try{
            return await this.model.create(data)
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }}

    async findByEmail(email:string): Promise<UserFindByEmailResponse | ErrorResponseType | null>{
        try{
            return await this.model.findOne({ email })
        }catch(e:any){
            return await commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async findByID(id: string){
        try{
            return await this.model.findById(id)
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }


}

export { UserRepository }