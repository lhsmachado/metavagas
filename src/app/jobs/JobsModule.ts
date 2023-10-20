import { City } from "../city/entities/City"
import { CityRepository } from "../city/repositories/CityRepository"
import { JobsController } from "./controllers/JobsControllers"
import { Jobs } from "./entities/Jobs"
import { JobsRepository } from "./repositories/JobsRepository"
import { JobsService } from "./services/JobsService"
import { Technology } from "../technology/entities/technology"
import { TechnologyRepository } from "../technology/repositories/TechnologyRepository"
import { TechnologyService } from "../technology/service/TechnologyService"
import { TechSearchRepository } from "../techSearch/repositories/techSearchRepository"
import { TechSearch } from "../techSearch/entities/techSearch"
import { CitySearchRepository } from "../citySearch/repositories/CitySearchRepository"
import { CitySearch } from "../citySearch/entities/CitySearch"

class JobsModule {
    static getInstances(){
        const jobsRepository = new JobsRepository(Jobs as any)
        const cityRepository = new CityRepository(City as any)
        const technologyRepository = new TechnologyRepository(Technology as any)
        const technologyService = new TechnologyService(technologyRepository)
        const techSearchRepository = new TechSearchRepository(TechSearch as any)
        const citySearchRepository = new CitySearchRepository(CitySearch as any)
        const service = new JobsService(jobsRepository, cityRepository, technologyService, techSearchRepository, citySearchRepository)
        const controller = new JobsController(service)

        return { jobsRepository, service, controller}
    }
}

export { JobsModule }