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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [
            {
                name: 'Alice',
                email: 'alice@example.com',
                role: 'admin',
                otp: '123456',
                otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min from now
            },
            {
                name: 'Bob',
                email: 'bob@example.com',
                role: 'user',
                otp: '654321',
                otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min from now
            },
        ];
        for (const userData of users) {
            const user = yield prisma.user.create({ data: userData });
            console.log(`Created user: ${user.email}`);
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
