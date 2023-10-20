import { describe, it, vi, expect } from "vitest"
import { CitySearchService } from "./CitySearchService"
import { TechSearchRepository } from "../../techSearch/repositories/techSearchRepository"
import { CitySearchRepository } from "../repositories/CitySearchRepository"

const techSearchRepositoryMock = {
    techsMostSearched: vi.fn()
} as any as  TechSearchRepository
const citySearchRepositoryMock = {
    citySearchedbyTech: vi.fn()
} as any as  CitySearchRepository

const sut = new CitySearchService( citySearchRepositoryMock, techSearchRepositoryMock)

describe("CitySearchService", () =>{
    it("should be able to return the tech most searched and the cities that most search that tech", async () =>{

        const techReturnMock:any = [
            {
                "technology": {
                    "_id": "6514ff29a1bee6c81d13a66c",
                    "technology": "CSS"
                },
                "count": 11
            },
            {
                "technology": {
                    "_id": "651503e7d563b8f3e036784a",
                    "technology": "Python"
                },
                "count": 10
            },
            {
                "technology": {
                    "_id": "6515018c1ededf428e2b5383",
                    "technology": "Lua"
                },
                "count": 10
            }]
        
        const cityReturnMock:any = [
            {
                "_id": "6526e6ef7d2bfde4f5027772",
                "technology": {
                    "_id": "6514ff29a1bee6c81d13a66c",
                    "technology": "CSS"
                },
                "city": {
                    "_id": "6511e3bc3f0512fff133d4ad",
                    "name": "Taquara",
                    "uf": "RA"
                },
                "count": 3
            },
            {
                "_id": "65307795c03287fe9a8f53f8",
                "technology": {
                    "_id": "6514ff29a1bee6c81d13a66c",
                    "technology": "CSS"
                },
                "city": {
                    "_id": "6511e3e55c9e3c2c3ccb025d",
                    "name": "fsdfds",
                    "uf": "RA"
                },
                "count": 3
            }
        ]

        vi.spyOn(techSearchRepositoryMock, "techsMostSearched").mockResolvedValue(techReturnMock)
        vi.spyOn(citySearchRepositoryMock, "citySearchedbyTech").mockResolvedValue(cityReturnMock)

        const expected = {
            techMostSearched:techReturnMock,
            cityMostSearched:cityReturnMock
        }
        const result = await sut.DashboardData()
        expect(result).toStrictEqual(expected)
    })
})