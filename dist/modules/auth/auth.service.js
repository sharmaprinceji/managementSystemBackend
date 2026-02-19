"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.refreshAccessToken = exports.loginUser = exports.registerUser = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = require("../../utils/bcrypt");
const jwt_1 = require("../../utils/jwt");
// REGISTER
const registerUser = async (email, password) => {
    const existing = await db_1.prisma.user.findUnique({
        where: { email },
    });
    if (existing) {
        throw new Error("User already exists");
    }
    const hashed = await (0, bcrypt_1.hashPassword)(password);
    const user = await db_1.prisma.user.create({
        data: {
            email,
            password: hashed,
        },
    });
    return user;
};
exports.registerUser = registerUser;
// LOGIN
const loginUser = async (email, password) => {
    const user = await db_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user)
        throw new Error("Invalid credentials");
    const valid = await (0, bcrypt_1.comparePassword)(password, user.password);
    if (!valid)
        throw new Error("Invalid credentials");
    const accessToken = (0, jwt_1.generateAccessToken)(user.id, user?.tokenVersion);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
    await db_1.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
        },
    };
};
exports.loginUser = loginUser;
// REFRESH ACCESS TOKEN
const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken)
        throw new Error("Missing refresh token");
    const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
    const user = await db_1.prisma.user.findUnique({
        where: { id: decoded.userId },
    });
    if (!user ||
        user.refreshToken !== refreshToken)
        throw new Error("Invalid refresh token");
    const newAccessToken = (0, jwt_1.generateAccessToken)(user.id, user?.tokenVersion);
    return newAccessToken;
};
exports.refreshAccessToken = refreshAccessToken;
const logoutUser = async (userId) => {
    await db_1.prisma.user.update({
        where: { id: userId },
        data: {
            refreshToken: null,
            tokenVersion: {
                increment: 1,
            },
        },
    });
};
exports.logoutUser = logoutUser;
