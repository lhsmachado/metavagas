import { describe, it, vi, expect, beforeEach } from "vitest"
import { AuthService } from "./AuthService"
import { UserRepository } from "../../user/repositories/UserRepository"
import bcrypt from 'bcrypt'
import JWT, { sign } from "jsonwebtoken"
import { commonError } from "../../../utils/commonErrors"
import { STATUS_CODE } from "../../../utils/statusCode"

const repositoryMock = {
    findByEmail: vi.fn(),
    create: vi.fn()
    } as any as UserRepository
const sut = new AuthService(repositoryMock)

describe("AuthService", ()=>{
    it("should return a token if data is validated", async ()=>{
        const paramsMock = { email: "luis@email.com", password:"1234" } as any
        const returnMock = { name: "Luis", email:"luis@email.com", password:"123456"} as any
    
        vi.spyOn(repositoryMock, "findByEmail").mockResolvedValue(returnMock)
        vi.spyOn(bcrypt, "compareSync").mockReturnValue(true)
        vi.spyOn(JWT, "sign").mockReturnValue("encryptedToken" as any)

        const result = await sut.login(paramsMock)
        const expected = {token:"encryptedToken",user: {name:"Luis", email:"luis@email.com", password:"123456"}}

        expect(result).toStrictEqual(expected)
    })

    it("should return a error if email was not found", async () =>{
        beforeEach(() => {
            vi.clearAllMocks()
        })
        const paramsMock = { email: "luis@email.com", password:"1234" } as any

        vi.spyOn(repositoryMock, "findByEmail").mockResolvedValue(null)

        const result = await sut.login(paramsMock)

        const expected = commonError("Email or password is invalid", STATUS_CODE.BAD_REQUEST)
        expect(result).toStrictEqual(expected)
    })

    it("should return a error if password is invalid", async () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        const paramsMock = { email: "luis@email.com", password:"1234" } as any
        const returnMock = { name: "Luis", email:"luis@email.com", password:"123456"} as any
        
        vi.spyOn(repositoryMock, "findByEmail").mockResolvedValue(returnMock)
        vi.spyOn(bcrypt, "compareSync").mockReturnValue(false)
        const result = await sut.login(paramsMock)

        const expected = commonError("Email or password is invalid", STATUS_CODE.BAD_REQUEST)

        expect(result).toStrictEqual(expected)
    })

})