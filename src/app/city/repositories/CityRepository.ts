import { Model } from "mongoose"
import { CityType } from "../entities/City"
import { ErrorResponseType, commonError } from "../../../utils/commonErrors"
import { STATUS_CODE } from "../../../utils/statusCode"

class CityRepository{
    constructor (private model: Model<CityType>){}

    async create(data: CityType){
        try{
            return await this.model.create(data)
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }}

    async findByName({name, uf }: CityType){
        try{
            return await this.model.findOne({name, uf})
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }
}

export { CityRepository }