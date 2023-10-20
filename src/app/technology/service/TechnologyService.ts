import { ErrorResponseType } from "../../../utils/commonErrors";
import { TechnologyType } from "../entities/technology";
import { TechnologyRepository } from "../repositories/TechnologyRepository";
import { TechnologyFindByNameResponse } from "../utils/technologyTypes";

class TechnologyService{
    constructor(private repository: TechnologyRepository){}

    async findByName(name:string){
        const technology = await this.repository.findByName(name)
        if(technology == null){
            return await this.repository.create(name)
        }

        return technology

    }
}

export { TechnologyService }