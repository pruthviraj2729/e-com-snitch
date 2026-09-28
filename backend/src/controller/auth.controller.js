import userModel from "../model/auth.model.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/auth.utils.js";
import bcrypt from "bcrypt";

export async function registerController(req, res) {
    const {email, name, password} = req.body;

    try{
        const isUserAllreadyExists = await userModel.findOne({
            email
        })

        if(isUserAllreadyExists) {
            return res.status(400).json({
                message: "User already exists with this email address",
                errors: [
                    {
                        path: "email",
                        msg: "User already exists with this email address"
                    }
                ]
            })
        }

        const user = await userModel.create({
            email,
            name,
            passwordHash: await bcrypt.hash(password, 12)
        })

        const accessToken = createAccessToken({
            userId: user._id,
            role: user.role
        })

        const refreshToken = createRefreshToken({
            userId: user._id,
            role: user.role
        })


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken
        })

        res.status(201).json({
            message: "User registered successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id,
                    role: user.role
                },
                accessToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export async function loginController (req, res) {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if(!isValidPassword) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    })

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })

    await userModel.findOneAndUpdate({
        email 
    }, {
        refreshToken
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    }) 

    res.status(200).json({
        message: "User loggedIn successfully",
        data: {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            accessToken
        }
    })
}


export async function refreshTokenController(req, res) {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token required"
        })
    }

    try {

        const decode = verifyRefreshToken(refreshToken)
        const { userId, role} = decode

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        if(refreshToken !== user.refreshToken) {
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken:null
            }) 

            return res.status(401).json({
                message: "Refresh token mismatch"
            })
        }


        const accessToken = createAccessToken({
            userId, role
        })

        const newRefreshToken = createRefreshToken({
            userId, role
        })

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken
        })

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true
        })

        res.status(200).json({
            message: "Token rotated successfully.",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id,
                    role: user.role
                },
                accessToken
            }
        })


        
    } catch (error) {
        return res.status(500).json({
            message: "Invalid refresh token"
        })
    }

}


export async function getMe(req, res) {
    const {userId, role} = req.user

    const user = await userModel.findById(userId)

    res.status(200).json({
        message: "User data fetch successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id,
                role: user.role
            }
        }
    })
}

export async function logoutController(req, res) {
    await userModel.findByIdAndUpdate(req.user.userId, {
        refreshToken: null
    })

    res.clearCookie("refreshToken", {
        httpOnly: true
    })

    return res.status(200).json({
        message: "Logged out successfully"
    })
}