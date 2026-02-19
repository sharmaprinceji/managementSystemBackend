"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
// REGISTER
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, auth_service_1.registerUser)(email, password);
        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user.id,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
exports.register = register;
// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const tokens = await (0, auth_service_1.loginUser)(email, password);
        res.json({
            message: "Login successful",
            ...tokens,
        });
    }
    catch (error) {
        res.status(401).json({
            error: error.message,
        });
    }
};
exports.login = login;
// REFRESH
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const accessToken = await (0, auth_service_1.refreshAccessToken)(refreshToken);
        res.json({
            accessToken,
        });
    }
    catch (error) {
        res.status(401).json({
            error: error.message,
        });
    }
};
exports.refresh = refresh;
// LOGOUT
const logout = async (req, res) => {
    try {
        await (0, auth_service_1.logoutUser)(req.userId);
        res.json({
            message: "Logout successful",
        });
    }
    catch {
        res.status(500).json({
            error: "Logout failed",
        });
    }
};
exports.logout = logout;
