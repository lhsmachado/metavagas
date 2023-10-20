import { describe, it, vi, expect } from "vitest"
import bcrypt from "bcrypt"

import { TechnologyService } from "./TechnologyService"
import { TechnologyRepository } from "../repositories/TechnologyRepository"

const repositoryMock = {
    findByName: vi.fn(),
    create: vi.fn()
    } as any as TechnologyRepository

const sut = new TechnologyService(repositoryMock)
const createdAtMock = new Date("2023-10-17");
describe("TechnologyService", () =>{
    it("should be able to return a object if technology exists", 
    async ()=> {
        const paramsMock = 'React'
        vi.spyOn(repositoryMock, "findByName").mockResolvedValue({
            id:'1',
            technology:"React",
            createdAt:"",
            updatedAt:"" 
        })
        
        const result = await sut.findByName(paramsMock)

    expect(result).toStrictEqual({
            id: "1",
            technology: "React",
            createdAt: "",
            updatedAt: "",
    })
    })

    it("should be able to create a object if technolgy not exist",
    async ()=>{
        const paramsMock = 'React'
        vi.spyOn(repositoryMock, "findByName").mockResolvedValue(null)
        vi.spyOn(repositoryMock, "create").mockResolvedValue({
            technology: "React",
            createdAt: "" ,
            updatedAt: "",
    })

    const result = await sut.findByName(paramsMock)
    expect(result).toStrictEqual({
        technology: "React",
        createdAt: "",
        updatedAt: "",
})
    })

})