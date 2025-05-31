"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/login", auth_controller_1.adminLogin);
router.get("/polls", auth_middleware_1.verifyAdmin, admin_controller_1.getAllPolls);
exports.default = router;
