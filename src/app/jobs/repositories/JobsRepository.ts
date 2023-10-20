import { Model, PaginateModel } from "mongoose"
import { ErrorResponseType, commonError } from "../../../utils/commonErrors"
import { STATUS_CODE } from "../../../utils/statusCode"
import { JobsType } from "../entities/Jobs"
import { DataType, OptionsType } from "../utils/JobsTypes"

class JobsRepository{
    constructor (private model: PaginateModel<JobsType>){}

    async create(data: DataType){
        try{
            return await (await (await this.model.create(data)).populate('cityID')).populate('technology') 
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }}

    async findByID(id: string){
        try{
            return await this.model.findById(id)
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async find(data:DataType, options:OptionsType)
    {
        try{
            return await this.model.paginate(data, options)
        }catch(e:any){
            return commonError(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }
}

export { JobsRepository }