import { verifyAccessToken } from "../utils/auth.utils.js"

export function authMiddleware(req, res, next) {
    const accessToken = req.headers.authorization?.split(" ")[1]

    if(!accessToken) {
        return res.status(400).json({
            message: "Access token not found in the request header"
        })
    }

    try {
        const decode = verifyAccessToken(accessToken)

        req.user = decode;

        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired access token"
        })
    }
}


export function authenticateSeller (req, res, next) {
    if(req.user.role !== "seller") {
        return res.status(403).json({
            message: "User is not authorize to perform this action"

        })
    }
    next()
}