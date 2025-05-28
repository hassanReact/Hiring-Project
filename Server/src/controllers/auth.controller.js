"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.verifyOtp = exports.authentication = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_config_1 = __importDefault(require("../../db/db.config"));
const MailerSender_1 = require("../utils/MailerSender");
const generateTokenAndSetCookie_1 = require("../utils/generateTokenAndSetCookie");
exports.authentication = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }
    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
    try {
        let user = yield db_config_1.default.user.findUnique({ where: { email } });
        if (user) {
            user = yield db_config_1.default.user.update({
                where: { email },
                data: { otp, otpExpiresAt },
            });
        }
        else {
            user = yield db_config_1.default.user.create({
                data: { email, otp, otpExpiresAt },
            });
        }
        yield (0, MailerSender_1.sendVerificationEmail)(email, otp);
        res.json({ message: 'OTP sent to email' });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error sending OTP' });
        return;
    }
}));
exports.verifyOtp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, otp } = req.body;
    if (!email || !otp) {
        res.status(400).json({ message: 'Email and OTP are required' });
        return;
    }
    try {
        const user = yield db_config_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid email or OTP' });
            return;
        }
        if (user.otp !== otp ||
            !user.otpExpiresAt ||
            new Date() > user.otpExpiresAt) {
            res.status(400).json({ message: 'Invalid or expired OTP' });
            return;
        }
        // Clear OTP fields
        yield db_config_1.default.user.update({
            where: { email },
            data: { otp: null, otpExpiresAt: null },
        });
        const token = (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, {
            id: user.id.toString(),
            email: user.email,
            role: (_a = user.role) !== null && _a !== void 0 ? _a : ''
        });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error verifying OTP' });
    }
}));
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.json({ message: 'Logged out successfully' });
}));
