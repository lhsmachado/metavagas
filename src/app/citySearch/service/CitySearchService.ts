import { TechSearchRepository } from "../../techSearch/repositories/techSearchRepository";
import { CitySearchRepository } from "../repositories/CitySearchRepository";

class CitySearchService{
    constructor(private citySearchRepository:CitySearchRepository, private techSearchRepository:TechSearchRepository){}

    async DashboardData(){

        const techMostSearched = await this.techSearchRepository.techsMostSearched()
        const cityMostSearched = await this.citySearchRepository.citySearchedbyTech
        (techMostSearched[0].technology._id.toString())

        const data ={
            techMostSearched: techMostSearched,
            cityMostSearched: cityMostSearched
        }
        
        return data
    }
}

export { CitySearchService }