import { TechSearch } from "../techSearch/entities/techSearch";
import { TechSearchRepository } from "../techSearch/repositories/techSearchRepository";
import { CitySearchController } from "./controllers/CitySearchController";
import { CitySearch } from "./entities/CitySearch";
import { CitySearchRepository } from "./repositories/CitySearchRepository";
import { CitySearchService } from "./service/CitySearchService";

class CitySearchModule{
    static getInstances(){
        const citySearchRepository = new CitySearchRepository(CitySearch as any)
        const techSearchRepository = new TechSearchRepository(TechSearch as any)
        const citySearchService = new CitySearchService(citySearchRepository, techSearchRepository)
        const controller = new CitySearchController(citySearchService)

        return {controller, citySearchService}
    }
}

export { CitySearchModule}