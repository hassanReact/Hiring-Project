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
exports.updateName = exports.getProfile = exports.assignRole = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_config_1 = __importDefault(require("../../db/db.config"));
const validRoles = ['Builder', 'Broker', 'Property Owner', 'Property Seeker'];
exports.assignRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    if (!validRoles.includes(role)) {
        res.status(400);
        throw new Error('Invalid role');
    }
    const user = yield db_config_1.default.user.update({
        where: { email: req.user.email },
        data: { role },
    });
    res.json({ message: 'Role assigned', role: user.role });
}));
exports.getProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_config_1.default.user.findUnique({
        where: { email: req.user.email },
        select: { email: true, name: true, role: true },
    });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json(user);
}));
exports.updateName = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Name is required');
    }
    const user = yield db_config_1.default.user.update({
        where: { email: req.user.email },
        data: { name },
    });
    res.json({ message: 'Name updated', name: user.name });
}));
