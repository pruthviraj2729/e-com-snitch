import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export function createAccessToken({userId, role}) {
    const accessToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN, {expiresIn: "1hr"})

    return accessToken
}

export function createRefreshToken({userId, role}) {
    const refreshToken = jwt.sign({
        userId, role
    }, config.REFRESH_TOKEN, { expiresIn: "7d"})

    return refreshToken
}

export function verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, config.ACCESS_TOKEN)
}

export function verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, config.REFRESH_TOKEN)
}