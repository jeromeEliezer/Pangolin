import { Request, Response, NextFunction } from 'express';
import JwtService from "../libs/jwt";

class AuthMiddleware {

    private jwt;
    constructor(jwtService: JwtService) {
        this.jwt = jwtService;
    }

    isAuth = async (req: Request | any, res: Response, next: NextFunction) => {
        try {

            if (!req.headers['authorization']) return res.status(401).json('Access denied. Your session expired');
            const token = req.headers['authorization'].split(' ')[1];
            if (!token) {
                return res.status(401).json('Access denied. Your session expired');
            }
            // Verify Token
            const decoded = await this.jwt.decodeToken(token);

            // if the user has permissions
            req.body.currentUserId = decoded.id;
            next();
        } catch (e) {
            return res.status(401).json('Authentication failed : \n' + e);
        }
    }


    refreshAccess = async (req: Request | any, res: Response, next: NextFunction) => {
        try {


            let token = req.headers['authorization'];
            if (!token) {
                return res.status(401).json('Access denied. Your session expired');
            }
            token = token.split(' ')[1]
            // Verify Token
            const decoded = await this.jwt.decodeToken(token);

            // if the user has permissions
            req.body.currentUserId = decoded.id;
            next();
        } catch (e) {
            return res.status(401).json('Authentication failed : \n' + e);
        }
    }

}

export default AuthMiddleware;
