import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken"

import { commonError } from "../commonErrors";
import { STATUS_CODE } from "../statusCode";

class EnsureAuthenticate {
  static execute(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers
  
    if (!authorization) {
      return res.status(STATUS_CODE.NON_AUTHORIZED).json(
        commonError("Non-Authorized", STATUS_CODE.NON_AUTHORIZED)
      )
    }

    const [, token] = authorization.split(" ")
    try { 
      JWT.verify(token, process.env.SECRET_KEY as string)
    } catch (err) {
      return res.status(STATUS_CODE.NON_AUTHORIZED).json(
        commonError("Non-Authorized", STATUS_CODE.NON_AUTHORIZED)
      )
    }

    next()
  }
}

export { EnsureAuthenticate }
