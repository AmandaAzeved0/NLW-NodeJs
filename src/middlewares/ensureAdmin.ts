import {Request,Response,NextFunction} from "express"

export function ensureAdmin(req: Request, res:Response, next: NextFunction){
    const admin = true

    admin?
        next()
        :res.status(401).json({error:"Unauthorized"})
    

}