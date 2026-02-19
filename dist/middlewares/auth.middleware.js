"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const db_1 = require("../config/db");
const jwt_1 = require("../utils/jwt");
const authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header)
            return res
                .status(401)
                .json({
                error: "Missing token",
            });
        const token = header.split(" ")[1];
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        const user = await db_1.prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        if (!user ||
            user?.tokenVersion !==
                decoded.tokenVersion)
            return res
                .status(401)
                .json({
                error: "Token invalid",
            });
        req.userId = user.id;
        next();
    }
    catch {
        return res
            .status(401)
            .json({
            error: "Token expired",
        });
    }
};
exports.authMiddleware = authMiddleware;
