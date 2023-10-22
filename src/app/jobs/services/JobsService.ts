import { ErrorResponseType, commonError } from "../../../utils/commonErrors";
import { STATUS_CODE } from "../../../utils/statusCode";
import { CityRepository } from "../../city/repositories/CityRepository";
import { CitySearchRepository } from "../../citySearch/repositories/CitySearchRepository";
import { TechSearchRepository } from "../../techSearch/repositories/techSearchRepository";
import { TechnologyService } from "../../technology/service/TechnologyService";
import { JobsRepository } from "../repositories/JobsRepository";
import { DataPersistType, OptionsType, QueryType } from "../utils/JobsTypes";




class JobsService {
    constructor(private jobsRepository:JobsRepository, private cityRepository:CityRepository, private technologyService:TechnologyService,
        private techSearchRepository:TechSearchRepository, private citySearchRepository:CitySearchRepository){}

    async create (data:DataPersistType) {
        try{
            const dataToPersist ={
                position: data.position,
                website: data.website,
                cityID:'',
                company: data.company,
                description: data.description,
                link: data.link,
                localType: data.localType,
                salary: data.salary,
                jobType: data.jobType,
                companySize: data.companySize,
                technology:[] as Array<string>,
                experience:data.experience
            }
            const cityChecker:any = {
                name:data.city,
                uf:data.uf
            }
            const city:any=  await this.cityRepository.findByName(cityChecker)
            if (city) {
                dataToPersist.cityID = city._id ;
            } else {
                const cityCreated:any = await this.cityRepository.create(cityChecker);
                dataToPersist.cityID = cityCreated._id ;
            }
            if(data.technology){
        for(let index = 0; index < data.technology.length; index++){
            const teste = data.technology[index]
            const technology:any = await this.technologyService.findByName(teste)
            if(technology){
            dataToPersist.technology.push(technology._id )}
        }}
        return await this.jobsRepository.create(dataToPersist)
    }catch(e:any){
        return commonError(e.error, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
    }

    async findByID (id:string){
        return await this.jobsRepository.findByID(id)
    }

    async findJobs(data:QueryType){

        const query: QueryType = {}; 
        if (data.position != undefined) query.position = { $regex: new RegExp(data.position, 'i') };
        if (data.cityID != undefined) query.cityID = data.cityID;
        if (data.company != undefined) query.company = data.company;
        if (data.description != undefined)  query.description = { $regex: new RegExp(data.description, 'i') };
        if (data.link != undefined) query.link = data.link;
        if (data.companySize != undefined) query.companySize = data.companySize;
        if (data.jobType != undefined) query.jobType = data.jobType;
        if(data.localType != undefined) query.localType = data.localType 
        if (data.minSalary != undefined) query.salary = {$gte: data.minSalary};
        if (data.maxSalary != undefined) query.salary = {...query.salary, $lte: data.maxSalary};
        if (data.experience != undefined) query.experience = data.experience
        console.log("aqui1", query)
        if (data.technology != undefined && data.technology.length > 0){
            
            query.technology = {$all: data.technology}
            data.technology.map(async (element: string) => {

                const techSearch:any = await this.techSearchRepository.findAndIncrement(element)
                if(techSearch.modifiedCount == 0){
                    const createTechSearch ={
                        technology: element,
                        count: 1
                    }
                    await this.techSearchRepository.create(createTechSearch)
                }
                console.log("aqui", query)

                if(data.cityID){
                    const find = {
                        city : data.cityID,
                        technology: element
                    }   

                    
                    const searchTechCity = await this.citySearchRepository.findAndIncrement(find)
                    console.log(searchTechCity)
                    if (!searchTechCity){
                        const createSearch = {
                            ...find,
                            count: 1
                        }
                        await this.citySearchRepository.create(createSearch)
                    }
                } 
            });

            
        } 

        const options:OptionsType ={
            page: 0,
            limit: 0
        }
        if(data.page != undefined){
            options.page = data.page
        }else{options.page = 1}
        if(data.limit !=undefined){
            options.limit = data.limit
        }else(options.limit = 10)

        
        return await this.jobsRepository.find(query, options)
    }
}

export { JobsService }