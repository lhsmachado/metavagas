import { describe, it, vi, expect } from "vitest"
import { CitySearchRepository } from "../../citySearch/repositories/CitySearchRepository"
import { TechSearchRepository } from "../../techSearch/repositories/techSearchRepository"
import { JobsRepository } from "../repositories/JobsRepository"
import { CityRepository } from "../../city/repositories/CityRepository"
import { JobsService } from "./JobsService"
import { TechnologyService } from "../../technology/service/TechnologyService"

const techSearchRepositoryMock = {
    techsMostSearched: vi.fn()
} as any as  TechSearchRepository

const citySearchRepositoryMock = {
    citySearchedbyTech: vi.fn()
} as any as  CitySearchRepository

const cityRepositoryMock = {
    findByName: vi.fn()
} as any as  CityRepository

const technologyServiceMock = {
    findByName: vi.fn()
} as any as  TechnologyService

const jobsRepositoryMock = {
    create: vi.fn(),
    find: vi.fn()
} as any as  JobsRepository

const sut = new JobsService(jobsRepositoryMock, cityRepositoryMock, technologyServiceMock, techSearchRepositoryMock,citySearchRepositoryMock )

describe("JobsService", async ()=>{

    it("should be able to create a job", async() =>{
        const paramsMock:any = {
            position: "Analista de Sistemas",
            city: "Curitiba",
            uf: "PR",
            technology: ["Java"],
            website: "javatech.com.br",
            company: "JavaTech",
            description: "Vaga para Analista de Sistemas na JavaTech",
            link: "javatech.com.br/analista-sistemas",
            companySize: "media",
            jobType:"clt",
            localType:"hibrido",
            salary:"5500.70",
            experience:"junior"
          }
          const cityMock:any = {
            name:"Curitiba",
            uf:'PR',
            createdAt:'',
            updatedAt:'',
            _id:1
          }
          const techMock:any = {
            name:"Java",
            createdAt:'',
            updatedAt:'',
            _id:1
          }
    
          const jobsMock:any = {
                position: "Analista de Sistemas",
                cityID: '1',
                technology: ['1'],
                website: "javatech.com.br",
                company: "JavaTech",
                description: "Vaga para Analista de Sistemas na JavaTech",
                link: "javatech.com.br/analista-sistemas",
                companySize: "media",
                jobType:"clt",
                localType:"hibrido",
                salary:"5500.70",
                experience:"junior",
                _id:"1"
              }
          
            const expected = {
                position: "Analista de Sistemas",
                cityID: '1',
                technology: ['1'],
                website: "javatech.com.br",
                company: "JavaTech",
                description: "Vaga para Analista de Sistemas na JavaTech",
                link: "javatech.com.br/analista-sistemas",
                companySize: "media",
                jobType:"clt",
                localType:"hibrido",
                salary:"5500.70",
                experience:"junior",
                _id:"1"
              }
    vi.spyOn(cityRepositoryMock, "findByName").mockResolvedValue(cityMock)  
    vi.spyOn(technologyServiceMock, "findByName").mockResolvedValue(techMock)
    vi.spyOn(jobsRepositoryMock, "create").mockResolvedValue(jobsMock)

    const result = await sut.create(paramsMock)
    expect(result).toStrictEqual(expected)
    })

    it ("should be able to return a list of jobs", async ()=>{
        
        const paramsMock = {
            localType:"remoto"
        }
        const returnMock:any = {
            "docs": [
                {
                    "experience": null,
                    "_id": "652ee5f7ac4641a420d9b49d",
                    "position": "Engenheiro de Dados",
                    "salary": 6000.9,
                    "cityID": "652c8d064ed9ad7e11f646e7",
                    "technology": [
                        "651503e7d563b8f3e036784a",
                        "652c8d124ed9ad7e11f64704",
                        "652c8cea4ed9ad7e11f646dc"
                    ],
                    "website": "bigdatatech.com.br",
                    "company": "BigDataTech",
                    "companySize": "media",
                    "description": "Vaga para Engenheiro de Dados na BigDataTech",
                    "link": "bigdatatech.com.br/engenheiro-dados",
                    "jobType": "pj",
                    "localType": "remoto",
                    "createdAt": "2023-10-17T19:52:23.363Z",
                    "updatedAt": "2023-10-17T19:52:23.363Z",
                    "__v": 0
                }
            ],
            "totalDocs": 1,
            "limit": 1,
            "totalPages": 1,
            "page": 1,
            "pagingCounter": 1,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prevPage": 1,
            "nextPage": 1
        }

        const expected = {
            "docs": [
                {
                    "experience": null,
                    "_id": "652ee5f7ac4641a420d9b49d",
                    "position": "Engenheiro de Dados",
                    "salary": 6000.9,
                    "cityID": "652c8d064ed9ad7e11f646e7",
                    "technology": [
                        "651503e7d563b8f3e036784a",
                        "652c8d124ed9ad7e11f64704",
                        "652c8cea4ed9ad7e11f646dc"
                    ],
                    "website": "bigdatatech.com.br",
                    "company": "BigDataTech",
                    "companySize": "media",
                    "description": "Vaga para Engenheiro de Dados na BigDataTech",
                    "link": "bigdatatech.com.br/engenheiro-dados",
                    "jobType": "pj",
                    "localType": "remoto",
                    "createdAt": "2023-10-17T19:52:23.363Z",
                    "updatedAt": "2023-10-17T19:52:23.363Z",
                    "__v": 0
                }
            ],
            "totalDocs": 1,
            "limit": 1,
            "totalPages": 1,
            "page": 1,
            "pagingCounter": 1,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prevPage": 1,
            "nextPage": 1
        }


        vi.spyOn(technologyServiceMock, "findByName").mockResolvedValue(null)
        vi.spyOn(jobsRepositoryMock, "find").mockResolvedValue(returnMock)
        
        const result = await sut.findJobs(paramsMock)
        expect(result).toStrictEqual(expected)

    })
})