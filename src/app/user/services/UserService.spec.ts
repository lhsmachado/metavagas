import { describe, it, vi, expect } from "vitest"
import bcrypt from "bcrypt"

import { UserService } from "./UserService"
import { UserRepository } from "../repositories/UserRepository"

const repositoryMock = {
    findByEmail: vi.fn(),
    create: vi.fn()
    } as any as UserRepository
const sut = new UserService(repositoryMock)

describe("UserService", () =>{
    it("should be able to return an error if user already exists", 
    async ()=> {
        const paramsMock = {name:"Luis", email: "luis@email.com", password:"1234" } as any
        vi.spyOn(repositoryMock, "findByEmail").mockResolvedValue({
            id: "123456",
        name: "Luis",
        email: "luis@email.com",
        password: "1234",
        createdAt: "",
        updatedAt: "",
        })

        const result = await sut.create(paramsMock)

    expect(result).toStrictEqual({
        error: true,
        message: "User already exists",
        status: 400
    })
    })


    it("should be able to create a user", async () => {
        const paramsMock = { name: "Luis", email: "luis@email.com", password: "1234" } as any
        const expected = {
            id: 1,
            name: "Luis",
            email: "luis@email.com",
            password: "123456789",
            createdAt: "",
            updatedAt: "",
        } as any
    
        vi.spyOn(repositoryMock, "findByEmail").mockResolvedValue(null)
        vi.spyOn(repositoryMock, "create").mockResolvedValue(expected)
        vi.spyOn(bcrypt, "hashSync").mockReturnValue("123456789")
    
        const result = await sut.create(paramsMock)
    
        expect(result).toStrictEqual(expected)
    })
})