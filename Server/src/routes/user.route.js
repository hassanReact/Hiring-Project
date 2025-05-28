"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post('/role', auth_1.authenticate, user_controller_1.assignRole);
router.get('/profile', auth_1.authenticate, user_controller_1.getProfile);
router.put('/update', auth_1.authenticate, user_controller_1.updateName);
exports.default = router;
