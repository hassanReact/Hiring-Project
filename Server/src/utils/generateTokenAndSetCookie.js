"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSetCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAndSetCookie = (res, user) => {
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
    });
    return token;
};
exports.generateTokenAndSetCookie = generateTokenAndSetCookie;
