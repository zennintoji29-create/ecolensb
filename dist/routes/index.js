"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scan_routes_1 = __importDefault(require("./scan.routes"));
const history_routes_1 = __importDefault(require("./history.routes"));
const health_routes_1 = __importDefault(require("./health.routes"));
const router = (0, express_1.Router)();
router.use('/scan', scan_routes_1.default);
router.use('/history', history_routes_1.default);
router.use('/health', health_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map