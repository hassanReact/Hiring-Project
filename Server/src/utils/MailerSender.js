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
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const template_1 = require("./template");
const sendVerificationEmail = (email, VerificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const html = template_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", VerificationToken);
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: process.env.GMAIL_FROM,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
        const response = transporter.sendMail({
            from: process.env.GMAIL_FROM,
            to: email,
            subject: 'Verify your email address',
            html,
        });
        if (response) {
            console.log("Verification Email Sent Succesfully", response);
        }
        return response;
    }
    catch (err) {
        console.error('Unexpected error sending email:', err);
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
